import { Controller } from '@nestjs/common/interfaces/controllers/controller.interface';
import { ApplicationConfig } from '@nestjs/core/application-config';
import { NestContainer } from '@nestjs/core/injector/container';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { CustomTransportStrategy } from './interfaces';
import { Server } from './server/server';
export declare class MicroservicesModule {
    private readonly clientsContainer;
    private listenersController;
    register(container: NestContainer, config: ApplicationConfig): void;
    setupListeners(container: NestContainer, server: Server & CustomTransportStrategy): void;
    setupClients(container: NestContainer): void;
    bindListeners(controllers: Map<string | symbol | Function, InstanceWrapper<Controller>>, server: Server & CustomTransportStrategy, moduleName: string): void;
    bindClients(items: Map<string | symbol | Function, InstanceWrapper<unknown>>): void;
    close(): Promise<void>;
}
