import { OutgoingEvent, OutgoingRequest, OutgoingResponse } from './packet.interface';
export interface Serializer<TInput = any, TOutput = any> {
    serialize(value: TInput): TOutput;
}
export declare type ProducerSerializer = Serializer<OutgoingEvent | OutgoingRequest, any>;
export declare type ConsumerSerializer = Serializer<OutgoingResponse, any>;
