import { ClientOptions } from '../interfaces/client-metadata.interface';
/**
 * Attaches the `ClientProxy` instance to the given property
 *
 * @param  {ClientOptions} metadata optional client metadata
 */
export declare function Client(metadata?: ClientOptions): PropertyDecorator;
