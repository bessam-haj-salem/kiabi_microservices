"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicroservicesModule = void 0;
const runtime_exception_1 = require("@nestjs/core/errors/exceptions/runtime.exception");
const guards_consumer_1 = require("@nestjs/core/guards/guards-consumer");
const guards_context_creator_1 = require("@nestjs/core/guards/guards-context-creator");
const injector_1 = require("@nestjs/core/injector/injector");
const interceptors_consumer_1 = require("@nestjs/core/interceptors/interceptors-consumer");
const interceptors_context_creator_1 = require("@nestjs/core/interceptors/interceptors-context-creator");
const pipes_consumer_1 = require("@nestjs/core/pipes/pipes-consumer");
const pipes_context_creator_1 = require("@nestjs/core/pipes/pipes-context-creator");
const client_1 = require("./client");
const container_1 = require("./container");
const exception_filters_context_1 = require("./context/exception-filters-context");
const rpc_context_creator_1 = require("./context/rpc-context-creator");
const rpc_proxy_1 = require("./context/rpc-proxy");
const listeners_controller_1 = require("./listeners-controller");
class MicroservicesModule {
    constructor() {
        this.clientsContainer = new container_1.ClientsContainer();
    }
    register(container, config) {
        const rpcProxy = new rpc_proxy_1.RpcProxy();
        const exceptionFiltersContext = new exception_filters_context_1.ExceptionFiltersContext(container, config);
        const contextCreator = new rpc_context_creator_1.RpcContextCreator(rpcProxy, exceptionFiltersContext, new pipes_context_creator_1.PipesContextCreator(container, config), new pipes_consumer_1.PipesConsumer(), new guards_context_creator_1.GuardsContextCreator(container, config), new guards_consumer_1.GuardsConsumer(), new interceptors_context_creator_1.InterceptorsContextCreator(container, config), new interceptors_consumer_1.InterceptorsConsumer());
        const injector = new injector_1.Injector();
        this.listenersController = new listeners_controller_1.ListenersController(this.clientsContainer, contextCreator, container, injector, client_1.ClientProxyFactory, exceptionFiltersContext);
    }
    setupListeners(container, server) {
        if (!this.listenersController) {
            throw new runtime_exception_1.RuntimeException();
        }
        const modules = container.getModules();
        modules.forEach(({ controllers }, moduleRef) => this.bindListeners(controllers, server, moduleRef));
    }
    setupClients(container) {
        if (!this.listenersController) {
            throw new runtime_exception_1.RuntimeException();
        }
        const modules = container.getModules();
        modules.forEach(({ controllers, providers }) => {
            this.bindClients(controllers);
            this.bindClients(providers);
        });
    }
    bindListeners(controllers, server, moduleName) {
        controllers.forEach(wrapper => this.listenersController.registerPatternHandlers(wrapper, server, moduleName));
    }
    bindClients(items) {
        items.forEach(({ instance, isNotMetatype }) => {
            !isNotMetatype &&
                this.listenersController.assignClientsToProperties(instance);
        });
    }
    async close() {
        const clients = this.clientsContainer.getAllClients();
        await Promise.all(clients.map(client => client.close()));
        this.clientsContainer.clear();
    }
}
exports.MicroservicesModule = MicroservicesModule;
