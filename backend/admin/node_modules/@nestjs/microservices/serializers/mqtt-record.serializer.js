"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MqttRecordSerializer = void 0;
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const record_builders_1 = require("../record-builders");
class MqttRecordSerializer {
    serialize(packet) {
        if ((packet === null || packet === void 0 ? void 0 : packet.data) &&
            shared_utils_1.isObject(packet.data) &&
            packet.data instanceof record_builders_1.MqttRecord) {
            const record = packet.data;
            return Object.assign(Object.assign({}, packet), { data: record.data, options: record.options });
        }
        return packet;
    }
}
exports.MqttRecordSerializer = MqttRecordSerializer;
