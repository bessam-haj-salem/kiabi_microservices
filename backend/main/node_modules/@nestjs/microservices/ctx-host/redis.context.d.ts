import { BaseRpcContext } from './base-rpc.context';
declare type RedisContextArgs = [string];
export declare class RedisContext extends BaseRpcContext<RedisContextArgs> {
    constructor(args: RedisContextArgs);
    /**
     * Returns the name of the channel.
     */
    getChannel(): string;
}
export {};
