import { BaseRpcContext } from './base-rpc.context';
declare type MqttContextArgs = [string, Record<string, any>];
export declare class MqttContext extends BaseRpcContext<MqttContextArgs> {
    constructor(args: MqttContextArgs);
    /**
     * Returns the name of the topic.
     */
    getTopic(): string;
    /**
     * Returns the refernce to the original MQTT packet.
     */
    getPacket(): Record<string, any>;
}
export {};
