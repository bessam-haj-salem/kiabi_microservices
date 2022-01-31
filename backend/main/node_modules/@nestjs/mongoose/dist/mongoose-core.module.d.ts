import { DynamicModule, OnApplicationShutdown } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { MongooseModuleAsyncOptions, MongooseModuleOptions } from './interfaces/mongoose-options.interface';
export declare class MongooseCoreModule implements OnApplicationShutdown {
    private readonly connectionName;
    private readonly moduleRef;
    constructor(connectionName: string, moduleRef: ModuleRef);
    static forRoot(uri: string, options?: MongooseModuleOptions): DynamicModule;
    static forRootAsync(options: MongooseModuleAsyncOptions): DynamicModule;
    onApplicationShutdown(): Promise<void>;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
}
