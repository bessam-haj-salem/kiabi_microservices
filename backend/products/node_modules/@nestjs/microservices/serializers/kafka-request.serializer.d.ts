/// <reference types="node" />
import { Serializer } from '../interfaces/serializer.interface';
export interface KafkaRequest<T = any> {
    key: Buffer | string | null;
    value: T;
    headers: Record<string, any>;
}
export declare class KafkaRequestSerializer implements Serializer<any, KafkaRequest> {
    serialize(value: any): KafkaRequest;
    encode(value: any): Buffer | string | null;
}
