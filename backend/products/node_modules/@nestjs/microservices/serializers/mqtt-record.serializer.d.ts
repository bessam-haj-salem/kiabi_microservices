import { ReadPacket } from '../interfaces';
import { Serializer } from '../interfaces/serializer.interface';
import { MqttRecord } from '../record-builders';
export declare class MqttRecordSerializer implements Serializer<ReadPacket, ReadPacket & Partial<MqttRecord>> {
    serialize(packet: ReadPacket | any): ReadPacket & Partial<MqttRecord>;
}
