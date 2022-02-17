import { Transport } from '../enums';
/**
 * Subscribes to incoming events which fulfils chosen pattern.
 */
export declare const EventPattern: <T = string>(metadata?: T, transport?: Transport) => MethodDecorator;
