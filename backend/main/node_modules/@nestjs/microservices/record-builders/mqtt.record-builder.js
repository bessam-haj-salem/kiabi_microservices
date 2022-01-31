"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MqttRecordBuilder = exports.MqttRecord = void 0;
class MqttRecord {
    constructor(data, options) {
        this.data = data;
        this.options = options;
    }
}
exports.MqttRecord = MqttRecord;
class MqttRecordBuilder {
    constructor(data) {
        this.data = data;
    }
    setData(data) {
        this.data = data;
        return this;
    }
    setQoS(qos) {
        this.options = Object.assign(Object.assign({}, this.options), { qos });
        return this;
    }
    setRetain(retain) {
        this.options = Object.assign(Object.assign({}, this.options), { retain });
        return this;
    }
    setDup(dup) {
        this.options = Object.assign(Object.assign({}, this.options), { dup });
        return this;
    }
    setProperties(properties) {
        this.options = Object.assign(Object.assign({}, this.options), { properties });
        return this;
    }
    build() {
        return new MqttRecord(this.data, this.options);
    }
}
exports.MqttRecordBuilder = MqttRecordBuilder;
