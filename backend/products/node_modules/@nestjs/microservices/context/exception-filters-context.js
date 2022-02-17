"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionFiltersContext = void 0;
const constants_1 = require("@nestjs/common/constants");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const base_exception_filter_context_1 = require("@nestjs/core/exceptions/base-exception-filter-context");
const constants_2 = require("@nestjs/core/injector/constants");
const rpc_exceptions_handler_1 = require("../exceptions/rpc-exceptions-handler");
const iterare_1 = require("iterare");
class ExceptionFiltersContext extends base_exception_filter_context_1.BaseExceptionFilterContext {
    constructor(container, config) {
        super(container);
        this.config = config;
    }
    create(instance, callback, module, contextId = constants_2.STATIC_CONTEXT, inquirerId) {
        this.moduleContext = module;
        const exceptionHandler = new rpc_exceptions_handler_1.RpcExceptionsHandler();
        const filters = this.createContext(instance, callback, constants_1.EXCEPTION_FILTERS_METADATA, contextId, inquirerId);
        if (shared_utils_1.isEmpty(filters)) {
            return exceptionHandler;
        }
        exceptionHandler.setCustomFilters(filters.reverse());
        return exceptionHandler;
    }
    getGlobalMetadata(contextId = constants_2.STATIC_CONTEXT, inquirerId) {
        const globalFilters = this.config.getGlobalFilters();
        if (contextId === constants_2.STATIC_CONTEXT && !inquirerId) {
            return globalFilters;
        }
        const scopedFilterWrappers = this.config.getGlobalRequestFilters();
        const scopedFilters = iterare_1.iterate(scopedFilterWrappers)
            .map(wrapper => wrapper.getInstanceByContextId(contextId, inquirerId))
            .filter(host => !!host)
            .map(host => host.instance)
            .toArray();
        return globalFilters.concat(scopedFilters);
    }
}
exports.ExceptionFiltersContext = ExceptionFiltersContext;
