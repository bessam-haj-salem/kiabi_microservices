"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRedis = void 0;
const logger_service_1 = require("@nestjs/common/services/logger.service");
const load_package_util_1 = require("@nestjs/common/utils/load-package.util");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const constants_1 = require("../constants");
const client_proxy_1 = require("./client-proxy");
let redisPackage = {};
class ClientRedis extends client_proxy_1.ClientProxy {
    constructor(options) {
        super();
        this.options = options;
        this.logger = new logger_service_1.Logger(client_proxy_1.ClientProxy.name);
        this.subscriptionsCount = new Map();
        this.isExplicitlyTerminated = false;
        this.url =
            this.getOptionsProp(options, 'url') ||
                (!this.getOptionsProp(options, 'host') && constants_1.REDIS_DEFAULT_URL);
        redisPackage = load_package_util_1.loadPackage('redis', ClientRedis.name, () => require('redis'));
        this.initializeSerializer(options);
        this.initializeDeserializer(options);
    }
    getRequestPattern(pattern) {
        return pattern;
    }
    getReplyPattern(pattern) {
        return `${pattern}.reply`;
    }
    close() {
        this.pubClient && this.pubClient.quit();
        this.subClient && this.subClient.quit();
        this.pubClient = this.subClient = null;
        this.isExplicitlyTerminated = true;
    }
    connect() {
        if (this.pubClient && this.subClient) {
            return this.connection;
        }
        const error$ = new rxjs_1.Subject();
        this.pubClient = this.createClient(error$);
        this.subClient = this.createClient(error$);
        this.handleError(this.pubClient);
        this.handleError(this.subClient);
        const pubConnect$ = rxjs_1.fromEvent(this.pubClient, constants_1.CONNECT_EVENT);
        const subClient$ = rxjs_1.fromEvent(this.subClient, constants_1.CONNECT_EVENT);
        this.connection = rxjs_1.lastValueFrom(rxjs_1.merge(error$, rxjs_1.zip(pubConnect$, subClient$)).pipe(operators_1.take(1), operators_1.tap(() => this.subClient.on(constants_1.MESSAGE_EVENT, this.createResponseCallback())), operators_1.share())).catch(err => {
            if (err instanceof rxjs_1.EmptyError) {
                return;
            }
            throw err;
        });
        return this.connection;
    }
    createClient(error$) {
        return redisPackage.createClient(Object.assign(Object.assign({}, this.getClientOptions(error$)), { url: this.url }));
    }
    handleError(client) {
        client.addListener(constants_1.ERROR_EVENT, (err) => this.logger.error(err));
    }
    getClientOptions(error$) {
        const retry_strategy = (options) => this.createRetryStrategy(options, error$);
        return Object.assign(Object.assign({}, (this.options || {})), { retry_strategy });
    }
    createRetryStrategy(options, error$) {
        if (options.error && options.error.code === constants_1.ECONNREFUSED) {
            error$.error(options.error);
        }
        if (this.isExplicitlyTerminated) {
            return undefined;
        }
        if (!this.getOptionsProp(this.options, 'retryAttempts') ||
            options.attempt > this.getOptionsProp(this.options, 'retryAttempts')) {
            return new Error('Retry time exhausted');
        }
        return this.getOptionsProp(this.options, 'retryDelay') || 0;
    }
    createResponseCallback() {
        return async (channel, buffer) => {
            const packet = JSON.parse(buffer);
            const { err, response, isDisposed, id } = await this.deserializer.deserialize(packet);
            const callback = this.routingMap.get(id);
            if (!callback) {
                return;
            }
            if (isDisposed || err) {
                return callback({
                    err,
                    response,
                    isDisposed: true,
                });
            }
            callback({
                err,
                response,
            });
        };
    }
    publish(partialPacket, callback) {
        try {
            const packet = this.assignPacketId(partialPacket);
            const pattern = this.normalizePattern(partialPacket.pattern);
            const serializedPacket = this.serializer.serialize(packet);
            const responseChannel = this.getReplyPattern(pattern);
            let subscriptionsCount = this.subscriptionsCount.get(responseChannel) || 0;
            const publishPacket = () => {
                subscriptionsCount = this.subscriptionsCount.get(responseChannel) || 0;
                this.subscriptionsCount.set(responseChannel, subscriptionsCount + 1);
                this.routingMap.set(packet.id, callback);
                this.pubClient.publish(this.getRequestPattern(pattern), JSON.stringify(serializedPacket));
            };
            if (subscriptionsCount <= 0) {
                this.subClient.subscribe(responseChannel, (err) => !err && publishPacket());
            }
            else {
                publishPacket();
            }
            return () => {
                this.unsubscribeFromChannel(responseChannel);
                this.routingMap.delete(packet.id);
            };
        }
        catch (err) {
            callback({ err });
        }
    }
    dispatchEvent(packet) {
        const pattern = this.normalizePattern(packet.pattern);
        const serializedPacket = this.serializer.serialize(packet);
        return new Promise((resolve, reject) => this.pubClient.publish(pattern, JSON.stringify(serializedPacket), err => err ? reject(err) : resolve()));
    }
    unsubscribeFromChannel(channel) {
        const subscriptionCount = this.subscriptionsCount.get(channel);
        this.subscriptionsCount.set(channel, subscriptionCount - 1);
        if (subscriptionCount - 1 <= 0) {
            this.subClient.unsubscribe(channel);
        }
    }
}
exports.ClientRedis = ClientRedis;
