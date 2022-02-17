/// <reference types="node" />
import { Logger } from '@nestjs/common/services/logger.service';
import { EventEmitter } from 'events';
import { Observable } from 'rxjs';
import { RmqUrl } from '../external/rmq-url.interface';
import { ReadPacket, RmqOptions, WritePacket } from '../interfaces';
import { ClientProxy } from './client-proxy';
export declare class ClientRMQ extends ClientProxy {
    protected readonly options: RmqOptions['options'];
    protected readonly logger: Logger;
    protected connection: Promise<any>;
    protected client: any;
    protected channel: any;
    protected urls: string[] | RmqUrl[];
    protected queue: string;
    protected queueOptions: any;
    protected responseEmitter: EventEmitter;
    protected replyQueue: string;
    protected persistent: boolean;
    constructor(options: RmqOptions['options']);
    close(): void;
    connect(): Promise<any>;
    createChannel(): Promise<void>;
    createClient<T = any>(): T;
    mergeDisconnectEvent<T = any>(instance: any, source$: Observable<T>): Observable<T>;
    setupChannel(channel: any, resolve: Function): Promise<void>;
    consumeChannel(channel: any): Promise<void>;
    handleError(client: any): void;
    handleDisconnectError(client: any): void;
    handleMessage(packet: unknown, callback: (packet: WritePacket) => any): Promise<void>;
    protected publish(message: ReadPacket, callback: (packet: WritePacket) => any): () => void;
    protected dispatchEvent(packet: ReadPacket): Promise<any>;
    protected initializeSerializer(options: RmqOptions['options']): void;
    protected mergeHeaders(requestHeaders?: Record<string, string>): Record<string, string> | undefined;
}
