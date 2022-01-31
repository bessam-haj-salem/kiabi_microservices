"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerRMQ = void 0;
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const constants_1 = require("../constants");
const ctx_host_1 = require("../ctx-host");
const enums_1 = require("../enums");
const rmq_record_serializer_1 = require("../serializers/rmq-record.serializer");
const server_1 = require("./server");
let rqmPackage = {};
class ServerRMQ extends server_1.Server {
    constructor(options) {
        super();
        this.options = options;
        this.transportId = enums_1.Transport.RMQ;
        this.server = null;
        this.channel = null;
        this.urls = this.getOptionsProp(this.options, 'urls') || [constants_1.RQM_DEFAULT_URL];
        this.queue =
            this.getOptionsProp(this.options, 'queue') || constants_1.RQM_DEFAULT_QUEUE;
        this.prefetchCount =
            this.getOptionsProp(this.options, 'prefetchCount') ||
                constants_1.RQM_DEFAULT_PREFETCH_COUNT;
        this.isGlobalPrefetchCount =
            this.getOptionsProp(this.options, 'isGlobalPrefetchCount') ||
                constants_1.RQM_DEFAULT_IS_GLOBAL_PREFETCH_COUNT;
        this.queueOptions =
            this.getOptionsProp(this.options, 'queueOptions') ||
                constants_1.RQM_DEFAULT_QUEUE_OPTIONS;
        this.loadPackage('amqplib', ServerRMQ.name, () => require('amqplib'));
        rqmPackage = this.loadPackage('amqp-connection-manager', ServerRMQ.name, () => require('amqp-connection-manager'));
        this.initializeSerializer(options);
        this.initializeDeserializer(options);
    }
    async listen(callback) {
        try {
            await this.start(callback);
        }
        catch (err) {
            callback(err);
        }
    }
    close() {
        this.channel && this.channel.close();
        this.server && this.server.close();
    }
    async start(callback) {
        this.server = this.createClient();
        this.server.on(constants_1.CONNECT_EVENT, () => {
            if (this.channel) {
                return;
            }
            this.channel = this.server.createChannel({
                json: false,
                setup: (channel) => this.setupChannel(channel, callback),
            });
        });
        this.server.on(constants_1.DISCONNECT_EVENT, (err) => {
            this.logger.error(constants_1.DISCONNECTED_RMQ_MESSAGE);
            this.logger.error(err);
        });
    }
    createClient() {
        const socketOptions = this.getOptionsProp(this.options, 'socketOptions');
        return rqmPackage.connect(this.urls, {
            connectionOptions: socketOptions,
            heartbeatIntervalInSeconds: socketOptions === null || socketOptions === void 0 ? void 0 : socketOptions.heartbeatIntervalInSeconds,
            reconnectTimeInSeconds: socketOptions === null || socketOptions === void 0 ? void 0 : socketOptions.reconnectTimeInSeconds,
        });
    }
    async setupChannel(channel, callback) {
        const noAck = this.getOptionsProp(this.options, 'noAck', constants_1.RQM_DEFAULT_NOACK);
        await channel.assertQueue(this.queue, this.queueOptions);
        await channel.prefetch(this.prefetchCount, this.isGlobalPrefetchCount);
        channel.consume(this.queue, (msg) => this.handleMessage(msg, channel), {
            noAck,
        });
        callback();
    }
    async handleMessage(message, channel) {
        if (shared_utils_1.isNil(message)) {
            return;
        }
        const { content, properties } = message;
        const rawMessage = JSON.parse(content.toString());
        const packet = await this.deserializer.deserialize(rawMessage);
        const pattern = shared_utils_1.isString(packet.pattern)
            ? packet.pattern
            : JSON.stringify(packet.pattern);
        const rmqContext = new ctx_host_1.RmqContext([message, channel, pattern]);
        if (shared_utils_1.isUndefined(packet.id)) {
            return this.handleEvent(pattern, packet, rmqContext);
        }
        const handler = this.getHandlerByPattern(pattern);
        if (!handler) {
            const status = 'error';
            const noHandlerPacket = {
                id: packet.id,
                err: constants_1.NO_MESSAGE_HANDLER,
                status,
            };
            return this.sendMessage(noHandlerPacket, properties.replyTo, properties.correlationId);
        }
        const response$ = this.transformToObservable(await handler(packet.data, rmqContext));
        const publish = (data) => this.sendMessage(data, properties.replyTo, properties.correlationId);
        response$ && this.send(response$, publish);
    }
    sendMessage(message, replyTo, correlationId) {
        const outgoingResponse = this.serializer.serialize(message);
        const options = outgoingResponse.options;
        delete outgoingResponse.options;
        const buffer = Buffer.from(JSON.stringify(outgoingResponse));
        this.channel.sendToQueue(replyTo, buffer, Object.assign({ correlationId }, options));
    }
    initializeSerializer(options) {
        var _a;
        this.serializer = (_a = options === null || options === void 0 ? void 0 : options.serializer) !== null && _a !== void 0 ? _a : new rmq_record_serializer_1.RmqRecordSerializer();
    }
}
exports.ServerRMQ = ServerRMQ;
