import { Logger } from '@nestjs/common/services/logger.service';
import { Subject } from 'rxjs';
import { ClientOpts, RedisClient, RetryStrategyOptions } from '../external/redis.interface';
import { ReadPacket, RedisOptions, WritePacket } from '../interfaces';
import { ClientProxy } from './client-proxy';
export declare class ClientRedis extends ClientProxy {
    protected readonly options: RedisOptions['options'];
    protected readonly logger: Logger;
    protected readonly subscriptionsCount: Map<string, number>;
    protected readonly url: string;
    protected pubClient: RedisClient;
    protected subClient: RedisClient;
    protected connection: Promise<any>;
    protected isExplicitlyTerminated: boolean;
    constructor(options: RedisOptions['options']);
    getRequestPattern(pattern: string): string;
    getReplyPattern(pattern: string): string;
    close(): void;
    connect(): Promise<any>;
    createClient(error$: Subject<Error>): RedisClient;
    handleError(client: RedisClient): void;
    getClientOptions(error$: Subject<Error>): Partial<ClientOpts>;
    createRetryStrategy(options: RetryStrategyOptions, error$: Subject<Error>): undefined | number | Error;
    createResponseCallback(): (channel: string, buffer: string) => Promise<void>;
    protected publish(partialPacket: ReadPacket, callback: (packet: WritePacket) => any): () => void;
    protected dispatchEvent(packet: ReadPacket): Promise<any>;
    protected unsubscribeFromChannel(channel: string): void;
}
