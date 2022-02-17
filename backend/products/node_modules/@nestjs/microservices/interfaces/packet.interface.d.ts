export interface PacketId {
    id: string;
}
export interface ReadPacket<T = any> {
    pattern: any;
    data: T;
}
export interface WritePacket<T = any> {
    err?: any;
    response?: T;
    isDisposed?: boolean;
    status?: string;
}
export declare type OutgoingRequest = ReadPacket & PacketId;
export declare type IncomingRequest = ReadPacket & PacketId;
export declare type OutgoingEvent = ReadPacket;
export declare type IncomingEvent = ReadPacket;
export declare type IncomingResponse = WritePacket & PacketId;
export declare type OutgoingResponse = WritePacket & PacketId;
