import { IncomingResponse } from '../interfaces';
import { IncomingResponseDeserializer } from './incoming-response.deserializer';
export declare class NatsResponseJSONDeserializer extends IncomingResponseDeserializer {
    private readonly jsonCodec;
    constructor();
    deserialize(value: Uint8Array, options?: Record<string, any>): IncomingResponse;
}
