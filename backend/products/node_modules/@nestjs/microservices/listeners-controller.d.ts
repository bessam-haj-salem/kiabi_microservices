import { Injectable } from '@nestjs/common/interfaces';
import { Controller } from '@nestjs/common/interfaces/controllers/controller.interface';
import { NestContainer } from '@nestjs/core/injector/container';
import { Injector } from '@nestjs/core/injector/injector';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { Module } from '@nestjs/core/injector/module';
import { IClientProxyFactory } from './client/client-proxy-factory';
import { ClientsContainer } from './container';
import { ExceptionFiltersContext } from './context/exception-filters-context';
import { RpcContextCreator } from './context/rpc-context-creator';
import { CustomTransportStrategy, MessageHandler, PatternMetadata } from './interfaces';
import { Server } from './server/server';
export declare class ListenersController {
    private readonly clientsContainer;
    private readonly contextCreator;
    private readonly container;
    private readonly injector;
    private readonly clientFactory;
    private readonly exceptionFiltersContext;
    private readonly metadataExplorer;
    private readonly exceptionFiltersCache;
    constructor(clientsContainer: ClientsContainer, contextCreator: RpcContextCreator, container: NestContainer, injector: Injector, clientFactory: IClientProxyFactory, exceptionFiltersContext: ExceptionFiltersContext);
    registerPatternHandlers(instanceWrapper: InstanceWrapper<Controller | Injectable>, server: Server & CustomTransportStrategy, moduleKey: string): void;
    assignClientsToProperties(instance: Controller | Injectable): void;
    assignClientToInstance<T = any>(instance: Controller | Injectable, property: string, client: T): void;
    createRequestScopedHandler(wrapper: InstanceWrapper, pattern: PatternMetadata, moduleRef: Module, moduleKey: string, methodKey: string, defaultCallMetadata?: Record<string, any>): MessageHandler<any, any, any>;
    private getContextId;
    private connectIfStream;
}
