"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaRequestSerializer = void 0;
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
class KafkaRequestSerializer {
    serialize(value) {
        const isNotKafkaMessage = shared_utils_1.isNil(value) ||
            !shared_utils_1.isObject(value) ||
            (!('key' in value) && !('value' in value));
        if (isNotKafkaMessage) {
            value = { value };
        }
        value.value = this.encode(value.value);
        if (!shared_utils_1.isNil(value.key)) {
            value.key = this.encode(value.key);
        }
        if (shared_utils_1.isNil(value.headers)) {
            value.headers = {};
        }
        return value;
    }
    encode(value) {
        const isObjectOrArray = !shared_utils_1.isNil(value) && !shared_utils_1.isString(value) && !Buffer.isBuffer(value);
        if (isObjectOrArray) {
            return shared_utils_1.isPlainObject(value) || Array.isArray(value)
                ? JSON.stringify(value)
                : value.toString();
        }
        else if (shared_utils_1.isUndefined(value)) {
            return null;
        }
        return value;
    }
}
exports.KafkaRequestSerializer = KafkaRequestSerializer;
