/// <reference types="node" />
import { Socket } from 'net';
export declare class JsonSocket {
    readonly socket: Socket;
    private contentLength;
    private isClosed;
    private buffer;
    private readonly stringDecoder;
    private readonly delimeter;
    get netSocket(): Socket;
    constructor(socket: Socket);
    connect(port: number, host: string): this;
    on(event: string, callback: (err?: any) => void): this;
    once(event: string, callback: (err?: any) => void): this;
    end(): this;
    sendMessage(message: any, callback?: (err?: any) => void): void;
    private onData;
    private handleData;
    private handleMessage;
    private formatMessageData;
}
