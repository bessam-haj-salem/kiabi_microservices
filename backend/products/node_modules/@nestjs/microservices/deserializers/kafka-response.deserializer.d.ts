import { Deserializer, IncomingResponse } from '../interfaces';
export declare class KafkaResponseDeserializer implements Deserializer<any, IncomingResponse> {
    deserialize(message: any, options?: Record<string, any>): IncomingResponse;
}
