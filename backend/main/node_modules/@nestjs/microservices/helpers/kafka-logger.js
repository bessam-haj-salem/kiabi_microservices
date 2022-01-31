"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaLogger = void 0;
const tslib_1 = require("tslib");
const kafka_interface_1 = require("../external/kafka.interface");
const KafkaLogger = (logger) => ({ namespace, level, label, log }) => {
    let loggerMethod;
    switch (level) {
        case kafka_interface_1.logLevel.ERROR:
        case kafka_interface_1.logLevel.NOTHING:
            loggerMethod = 'error';
            break;
        case kafka_interface_1.logLevel.WARN:
            loggerMethod = 'warn';
            break;
        case kafka_interface_1.logLevel.INFO:
            loggerMethod = 'log';
            break;
        case kafka_interface_1.logLevel.DEBUG:
        default:
            loggerMethod = 'debug';
            break;
    }
    const { message } = log, others = tslib_1.__rest(log, ["message"]);
    if (logger[loggerMethod]) {
        logger[loggerMethod](`${label} [${namespace}] ${message} ${JSON.stringify(others)}`);
    }
};
exports.KafkaLogger = KafkaLogger;
