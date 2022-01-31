"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerNats = void 0;
const tslib_1 = require("tslib");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const constants_1 = require("../constants");
const nats_context_1 = require("../ctx-host/nats.context");
const nats_request_json_deserializer_1 = require("../deserializers/nats-request-json.deserializer");
const enums_1 = require("../enums");
const nats_record_serializer_1 = require("../serializers/nats-record.serializer");
const server_1 = require("./server");
let natsPackage = {};
class ServerNats extends server_1.Server {
    constructor(options) {
        super();
        this.options = options;
        this.transportId = enums_1.Transport.NATS;
        natsPackage = this.loadPackage('nats', ServerNats.name, () => require('nats'));
        this.initializeSerializer(options);
        this.initializeDeserializer(options);
    }
    async listen(callback) {
        try {
            this.natsClient = await this.createNatsClient();
            this.handleStatusUpdates(this.natsClient);
            this.start(callback);
        }
        catch (err) {
            callback(err);
        }
    }
    start(callback) {
        this.bindEvents(this.natsClient);
        callback();
    }
    bindEvents(client) {
        const queue = this.getOptionsProp(this.options, 'queue');
        const subscribe = (channel) => client.subscribe(channel, {
            queue,
            callback: this.getMessageHandler(channel).bind(this),
        });
        const registeredPatterns = [...this.messageHandlers.keys()];
        registeredPatterns.forEach(channel => subscribe(channel));
    }
    async close() {
        var _a;
        await ((_a = this.natsClient) === null || _a === void 0 ? void 0 : _a.close());
        this.natsClient = null;
    }
    createNatsClient() {
        const options = this.options || {};
        return natsPackage.connect(Object.assign({ servers: constants_1.NATS_DEFAULT_URL }, options));
    }
    getMessageHandler(channel) {
        return async (error, message) => {
            if (error) {
                return this.logger.error(error);
            }
            return this.handleMessage(channel, message);
        };
    }
    async handleMessage(channel, natsMsg) {
        const callerSubject = natsMsg.subject;
        const rawMessage = natsMsg.data;
        const replyTo = natsMsg.reply;
        const natsCtx = new nats_context_1.NatsContext([callerSubject, natsMsg.headers]);
        const message = await this.deserializer.deserialize(rawMessage, {
            channel,
            replyTo,
        });
        if (shared_utils_1.isUndefined(message.id)) {
            return this.handleEvent(channel, message, natsCtx);
        }
        const publish = this.getPublisher(natsMsg, message.id);
        const handler = this.getHandlerByPattern(channel);
        if (!handler) {
            const status = 'error';
            const noHandlerPacket = {
                id: message.id,
                status,
                err: constants_1.NO_MESSAGE_HANDLER,
            };
            return publish(noHandlerPacket);
        }
        const response$ = this.transformToObservable(await handler(message.data, natsCtx));
        response$ && this.send(response$, publish);
    }
    getPublisher(natsMsg, id) {
        if (natsMsg.reply) {
            return (response) => {
                Object.assign(response, { id });
                const outgoingResponse = this.serializer.serialize(response);
                return natsMsg.respond(outgoingResponse.data, {
                    headers: outgoingResponse.headers,
                });
            };
        }
        // In case the "reply" topic is not provided, there's no need for a reply.
        // Method returns a noop function instead
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return () => { };
    }
    async handleStatusUpdates(client) {
        var e_1, _a;
        try {
            for (var _b = tslib_1.__asyncValues(client.status()), _c; _c = await _b.next(), !_c.done;) {
                const status = _c.value;
                const data = status.data && shared_utils_1.isObject(status.data)
                    ? JSON.stringify(status.data)
                    : status.data;
                if (status.type === 'disconnect' || status.type === 'error') {
                    this.logger.error(`NatsError: type: "${status.type}", data: "${data}".`);
                }
                else {
                    const message = `NatsStatus: type: "${status.type}", data: "${data}".`;
                    if (status.type === 'pingTimer') {
                        this.logger.debug(message);
                    }
                    else {
                        this.logger.log(message);
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    initializeSerializer(options) {
        var _a;
        this.serializer = (_a = options === null || options === void 0 ? void 0 : options.serializer) !== null && _a !== void 0 ? _a : new nats_record_serializer_1.NatsRecordSerializer();
    }
    initializeDeserializer(options) {
        var _a;
        this.deserializer =
            (_a = options === null || options === void 0 ? void 0 : options.deserializer) !== null && _a !== void 0 ? _a : new nats_request_json_deserializer_1.NatsRequestJSONDeserializer();
    }
}
exports.ServerNats = ServerNats;
