import { ConsumerDeserializer, IncomingEvent, IncomingRequest } from '../interfaces';
export declare class IncomingRequestDeserializer implements ConsumerDeserializer {
    deserialize(value: any, options?: Record<string, any>): IncomingRequest | IncomingEvent;
    isExternal(value: any): boolean;
    mapToSchema(value: any, options?: Record<string, any>): IncomingRequest | IncomingEvent;
}
