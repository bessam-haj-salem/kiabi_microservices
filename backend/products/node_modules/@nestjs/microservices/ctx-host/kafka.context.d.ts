import { KafkaMessage } from '../external/kafka.interface';
import { BaseRpcContext } from './base-rpc.context';
declare type KafkaContextArgs = [KafkaMessage, number, string];
export declare class KafkaContext extends BaseRpcContext<KafkaContextArgs> {
    constructor(args: KafkaContextArgs);
    /**
     * Returns the reference to the original message.
     */
    getMessage(): KafkaMessage;
    /**
     * Returns the partition.
     */
    getPartition(): number;
    /**
     * Returns the name of the topic.
     */
    getTopic(): string;
}
export {};
