"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventPattern = void 0;
const constants_1 = require("../constants");
const pattern_handler_enum_1 = require("../enums/pattern-handler.enum");
/**
 * Subscribes to incoming events which fulfils chosen pattern.
 */
const EventPattern = (metadata, transport) => {
    return (target, key, descriptor) => {
        Reflect.defineMetadata(constants_1.PATTERN_METADATA, metadata, descriptor.value);
        Reflect.defineMetadata(constants_1.PATTERN_HANDLER_METADATA, pattern_handler_enum_1.PatternHandler.EVENT, descriptor.value);
        Reflect.defineMetadata(constants_1.TRANSPORT_METADATA, transport, descriptor.value);
        return descriptor;
    };
};
exports.EventPattern = EventPattern;
