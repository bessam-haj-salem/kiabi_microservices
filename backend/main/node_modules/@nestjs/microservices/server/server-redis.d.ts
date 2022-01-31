import { Transport } from '../enums';
import { ClientOpts, RedisClient, RetryStrategyOptions } from '../external/redis.interface';
import { CustomTransportStrategy } from '../interfaces';
import { RedisOptions } from '../interfaces/microservice-configuration.interface';
import { Server } from './server';
export declare class ServerRedis extends Server implements CustomTransportStrategy {
    private readonly options;
    readonly transportId = Transport.REDIS;
    private readonly url;
    private subClient;
    private pubClient;
    private isExplicitlyTerminated;
    constructor(options: RedisOptions['options']);
    listen(callback: (err?: unknown, ...optionalParams: unknown[]) => void): void;
    start(callback?: () => void): void;
    bindEvents(subClient: RedisClient, pubClient: RedisClient): void;
    close(): void;
    createRedisClient(): RedisClient;
    getMessageHandler(pub: RedisClient): (channel: string, buffer: string | any) => Promise<any>;
    handleMessage(channel: string, buffer: string | any, pub: RedisClient): Promise<any>;
    getPublisher(pub: RedisClient, pattern: any, id: string): (response: any) => boolean;
    parseMessage(content: any): Record<string, any>;
    getRequestPattern(pattern: string): string;
    getReplyPattern(pattern: string): string;
    handleError(stream: any): void;
    getClientOptions(): Partial<ClientOpts>;
    createRetryStrategy(options: RetryStrategyOptions): undefined | number | void;
}
