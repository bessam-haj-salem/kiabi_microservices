import { BaseRpcContext } from './base-rpc.context';
declare type NatsContextArgs = [string, any];
export declare class NatsContext extends BaseRpcContext<NatsContextArgs> {
    constructor(args: NatsContextArgs);
    /**
     * Returns the name of the subject.
     */
    getSubject(): string;
    /**
     * Returns message headers (if exist).
     */
    getHeaders(): any;
}
export {};
