"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NatsRecordSerializer = void 0;
const load_package_util_1 = require("@nestjs/common/utils/load-package.util");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const record_builders_1 = require("../record-builders");
let natsPackage = {};
class NatsRecordSerializer {
    constructor() {
        natsPackage = load_package_util_1.loadPackage('nats', NatsRecordSerializer.name, () => require('nats'));
        this.jsonCodec = natsPackage.JSONCodec();
    }
    serialize(packet) {
        const natsMessage = (packet === null || packet === void 0 ? void 0 : packet.data) && shared_utils_1.isObject(packet.data) && packet.data instanceof record_builders_1.NatsRecord
            ? packet.data
            : new record_builders_1.NatsRecordBuilder(packet === null || packet === void 0 ? void 0 : packet.data).build();
        return {
            data: this.jsonCodec.encode(Object.assign(Object.assign({}, packet), { data: natsMessage.data })),
            headers: natsMessage.headers,
        };
    }
}
exports.NatsRecordSerializer = NatsRecordSerializer;
