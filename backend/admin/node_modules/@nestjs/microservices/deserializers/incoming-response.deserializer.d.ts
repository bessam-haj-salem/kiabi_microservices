import { IncomingResponse, ProducerDeserializer } from '../interfaces';
export declare class IncomingResponseDeserializer implements ProducerDeserializer {
    deserialize(value: any, options?: Record<string, any>): IncomingResponse;
    isExternal(value: any): boolean;
    mapToSchema(value: any): IncomingResponse;
}
