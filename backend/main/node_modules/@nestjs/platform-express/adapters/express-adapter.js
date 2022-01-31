"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressAdapter = void 0;
const common_1 = require("@nestjs/common");
const interfaces_1 = require("@nestjs/common/interfaces");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const http_adapter_1 = require("@nestjs/core/adapters/http-adapter");
const router_method_factory_1 = require("@nestjs/core/helpers/router-method-factory");
const body_parser_1 = require("body-parser");
const cors = require("cors");
const express = require("express");
const http = require("http");
const https = require("https");
class ExpressAdapter extends http_adapter_1.AbstractHttpAdapter {
    constructor(instance) {
        super(instance || express());
        this.routerMethodFactory = new router_method_factory_1.RouterMethodFactory();
    }
    reply(response, body, statusCode) {
        if (statusCode) {
            response.status(statusCode);
        }
        if (shared_utils_1.isNil(body)) {
            return response.send();
        }
        if (body instanceof common_1.StreamableFile) {
            const streamHeaders = body.getHeaders();
            if (response.getHeader('Content-Type') === undefined) {
                response.setHeader('Content-Type', streamHeaders.type);
            }
            if (response.getHeader('Content-Disposition') === undefined) {
                response.setHeader('Content-Disposition', streamHeaders.disposition);
            }
            return body.getStream().pipe(response);
        }
        return shared_utils_1.isObject(body) ? response.json(body) : response.send(String(body));
    }
    status(response, statusCode) {
        return response.status(statusCode);
    }
    render(response, view, options) {
        return response.render(view, options);
    }
    redirect(response, statusCode, url) {
        return response.redirect(statusCode, url);
    }
    setErrorHandler(handler, prefix) {
        return this.use(handler);
    }
    setNotFoundHandler(handler, prefix) {
        return this.use(handler);
    }
    setHeader(response, name, value) {
        return response.set(name, value);
    }
    listen(port, ...args) {
        return this.httpServer.listen(port, ...args);
    }
    close() {
        if (!this.httpServer) {
            return undefined;
        }
        return new Promise(resolve => this.httpServer.close(resolve));
    }
    set(...args) {
        return this.instance.set(...args);
    }
    enable(...args) {
        return this.instance.enable(...args);
    }
    disable(...args) {
        return this.instance.disable(...args);
    }
    engine(...args) {
        return this.instance.engine(...args);
    }
    useStaticAssets(path, options) {
        if (options && options.prefix) {
            return this.use(options.prefix, express.static(path, options));
        }
        return this.use(express.static(path, options));
    }
    setBaseViewsDir(path) {
        return this.set('views', path);
    }
    setViewEngine(engine) {
        return this.set('view engine', engine);
    }
    getRequestHostname(request) {
        return request.hostname;
    }
    getRequestMethod(request) {
        return request.method;
    }
    getRequestUrl(request) {
        return request.originalUrl;
    }
    enableCors(options) {
        return this.use(cors(options));
    }
    createMiddlewareFactory(requestMethod) {
        return this.routerMethodFactory
            .get(this.instance, requestMethod)
            .bind(this.instance);
    }
    initHttpServer(options) {
        const isHttpsEnabled = options && options.httpsOptions;
        if (isHttpsEnabled) {
            this.httpServer = https.createServer(options.httpsOptions, this.getInstance());
            return;
        }
        this.httpServer = http.createServer(this.getInstance());
    }
    registerParserMiddleware() {
        const parserMiddleware = {
            jsonParser: body_parser_1.json(),
            urlencodedParser: body_parser_1.urlencoded({ extended: true }),
        };
        Object.keys(parserMiddleware)
            .filter(parser => !this.isMiddlewareApplied(parser))
            .forEach(parserKey => this.use(parserMiddleware[parserKey]));
    }
    setLocal(key, value) {
        this.instance.locals[key] = value;
        return this;
    }
    getType() {
        return 'express';
    }
    applyVersionFilter(handler, version, versioningOptions) {
        return (req, res, next) => {
            var _a, _b, _c, _d;
            if (version === interfaces_1.VERSION_NEUTRAL) {
                return handler(req, res, next);
            }
            // URL Versioning is done via the path, so the filter continues forward
            if (versioningOptions.type === common_1.VersioningType.URI) {
                return handler(req, res, next);
            }
            // Media Type (Accept Header) Versioning Handler
            if (versioningOptions.type === common_1.VersioningType.MEDIA_TYPE) {
                const MEDIA_TYPE_HEADER = 'Accept';
                const acceptHeaderValue = ((_a = req.headers) === null || _a === void 0 ? void 0 : _a[MEDIA_TYPE_HEADER]) ||
                    ((_b = req.headers) === null || _b === void 0 ? void 0 : _b[MEDIA_TYPE_HEADER.toLowerCase()]);
                const acceptHeaderVersionParameter = acceptHeaderValue
                    ? acceptHeaderValue.split(';')[1]
                    : '';
                if (acceptHeaderVersionParameter) {
                    const headerVersion = acceptHeaderVersionParameter.split(versioningOptions.key)[1];
                    if (Array.isArray(version)) {
                        if (version.includes(headerVersion)) {
                            return handler(req, res, next);
                        }
                    }
                    else if (shared_utils_1.isString(version)) {
                        if (version === headerVersion) {
                            return handler(req, res, next);
                        }
                    }
                }
            }
            // Header Versioning Handler
            else if (versioningOptions.type === common_1.VersioningType.HEADER) {
                const customHeaderVersionParameter = ((_c = req.headers) === null || _c === void 0 ? void 0 : _c[versioningOptions.header]) ||
                    ((_d = req.headers) === null || _d === void 0 ? void 0 : _d[versioningOptions.header.toLowerCase()]);
                if (customHeaderVersionParameter) {
                    if (Array.isArray(version)) {
                        if (version.includes(customHeaderVersionParameter)) {
                            return handler(req, res, next);
                        }
                    }
                    else if (shared_utils_1.isString(version)) {
                        if (version === customHeaderVersionParameter) {
                            return handler(req, res, next);
                        }
                    }
                }
            }
            if (!next) {
                throw new common_1.InternalServerErrorException('HTTP adapter does not support filtering on version');
            }
            return next();
        };
    }
    isMiddlewareApplied(name) {
        const app = this.getInstance();
        return (!!app._router &&
            !!app._router.stack &&
            shared_utils_1.isFunction(app._router.stack.filter) &&
            app._router.stack.some((layer) => layer && layer.handle && layer.handle.name === name));
    }
}
exports.ExpressAdapter = ExpressAdapter;
