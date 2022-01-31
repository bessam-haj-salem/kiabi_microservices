"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerRedis = void 0;
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const constants_1 = require("../constants");
const ctx_host_1 = require("../ctx-host");
const enums_1 = require("../enums");
const server_1 = require("./server");
let redisPackage = {};
class ServerRedis extends server_1.Server {
    constructor(options) {
        super();
        this.options = options;
        this.transportId = enums_1.Transport.REDIS;
        this.isExplicitlyTerminated = false;
        this.url =
            this.getOptionsProp(options, 'url') ||
                (!this.getOptionsProp(options, 'host') && constants_1.REDIS_DEFAULT_URL);
        redisPackage = this.loadPackage('redis', ServerRedis.name, () => require('redis'));
        this.initializeSerializer(options);
        this.initializeDeserializer(options);
    }
    listen(callback) {
        try {
            this.subClient = this.createRedisClient();
            this.pubClient = this.createRedisClient();
            this.handleError(this.pubClient);
            this.handleError(this.subClient);
            this.start(callback);
        }
        catch (err) {
            callback(err);
        }
    }
    start(callback) {
        this.bindEvents(this.subClient, this.pubClient);
        this.subClient.on(constants_1.CONNECT_EVENT, callback);
    }
    bindEvents(subClient, pubClient) {
        subClient.on(constants_1.MESSAGE_EVENT, this.getMessageHandler(pubClient).bind(this));
        const subscribePatterns = [...this.messageHandlers.keys()];
        subscribePatterns.forEach(pattern => {
            const { isEventHandler } = this.messageHandlers.get(pattern);
            subClient.subscribe(isEventHandler ? pattern : this.getRequestPattern(pattern));
        });
    }
    close() {
        this.isExplicitlyTerminated = true;
        this.pubClient && this.pubClient.quit();
        this.subClient && this.subClient.quit();
    }
    createRedisClient() {
        return redisPackage.createClient(Object.assign(Object.assign({}, this.getClientOptions()), { url: this.url }));
    }
    getMessageHandler(pub) {
        return async (channel, buffer) => this.handleMessage(channel, buffer, pub);
    }
    async handleMessage(channel, buffer, pub) {
        const rawMessage = this.parseMessage(buffer);
        const packet = await this.deserializer.deserialize(rawMessage, { channel });
        const redisCtx = new ctx_host_1.RedisContext([channel]);
        if (shared_utils_1.isUndefined(packet.id)) {
            return this.handleEvent(channel, packet, redisCtx);
        }
        const publish = this.getPublisher(pub, channel, packet.id);
        const handler = this.getHandlerByPattern(channel);
        if (!handler) {
            const status = 'error';
            const noHandlerPacket = {
                id: packet.id,
                status,
                err: constants_1.NO_MESSAGE_HANDLER,
            };
            return publish(noHandlerPacket);
        }
        const response$ = this.transformToObservable(await handler(packet.data, redisCtx));
        response$ && this.send(response$, publish);
    }
    getPublisher(pub, pattern, id) {
        return (response) => {
            Object.assign(response, { id });
            const outgoingResponse = this.serializer.serialize(response);
            return pub.publish(this.getReplyPattern(pattern), JSON.stringify(outgoingResponse));
        };
    }
    parseMessage(content) {
        try {
            return JSON.parse(content);
        }
        catch (e) {
            return content;
        }
    }
    getRequestPattern(pattern) {
        return pattern;
    }
    getReplyPattern(pattern) {
        return `${pattern}.reply`;
    }
    handleError(stream) {
        stream.on(constants_1.ERROR_EVENT, (err) => this.logger.error(err));
    }
    getClientOptions() {
        const retry_strategy = (options) => this.createRetryStrategy(options);
        return Object.assign(Object.assign({}, (this.options || {})), { retry_strategy });
    }
    createRetryStrategy(options) {
        if (options.error && options.error.code === 'ECONNREFUSED') {
            this.logger.error(`Error ECONNREFUSED: ${this.url}`);
        }
        if (this.isExplicitlyTerminated) {
            return undefined;
        }
        if (!this.getOptionsProp(this.options, 'retryAttempts') ||
            options.attempt > this.getOptionsProp(this.options, 'retryAttempts')) {
            this.logger.error(`Retry time exhausted: ${this.url}`);
            throw new Error('Retry time exhausted');
        }
        return this.getOptionsProp(this.options, 'retryDelay') || 0;
    }
}
exports.ServerRedis = ServerRedis;
