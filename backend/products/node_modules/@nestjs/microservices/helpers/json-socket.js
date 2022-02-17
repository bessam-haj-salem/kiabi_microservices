"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonSocket = void 0;
const string_decoder_1 = require("string_decoder");
const constants_1 = require("../constants");
const corrupted_packet_length_exception_1 = require("../errors/corrupted-packet-length.exception");
const invalid_json_format_exception_1 = require("../errors/invalid-json-format.exception");
const net_socket_closed_exception_1 = require("../errors/net-socket-closed.exception");
class JsonSocket {
    constructor(socket) {
        this.socket = socket;
        this.contentLength = null;
        this.isClosed = false;
        this.buffer = '';
        this.stringDecoder = new string_decoder_1.StringDecoder();
        this.delimeter = '#';
        this.socket.on(constants_1.DATA_EVENT, this.onData.bind(this));
        this.socket.on(constants_1.CONNECT_EVENT, () => (this.isClosed = false));
        this.socket.on(constants_1.CLOSE_EVENT, () => (this.isClosed = true));
        this.socket.on(constants_1.ERROR_EVENT, () => (this.isClosed = true));
    }
    get netSocket() {
        return this.socket;
    }
    connect(port, host) {
        this.socket.connect(port, host);
        return this;
    }
    on(event, callback) {
        this.socket.on(event, callback);
        return this;
    }
    once(event, callback) {
        this.socket.once(event, callback);
        return this;
    }
    end() {
        this.socket.end();
        return this;
    }
    sendMessage(message, callback) {
        if (this.isClosed) {
            callback && callback(new net_socket_closed_exception_1.NetSocketClosedException());
            return;
        }
        this.socket.write(this.formatMessageData(message), 'utf-8', callback);
    }
    onData(dataRaw) {
        const data = Buffer.isBuffer(dataRaw)
            ? this.stringDecoder.write(dataRaw)
            : dataRaw;
        try {
            this.handleData(data);
        }
        catch (e) {
            this.socket.emit(constants_1.ERROR_EVENT, e.message);
            this.socket.end();
        }
    }
    handleData(data) {
        this.buffer += data;
        if (this.contentLength == null) {
            const i = this.buffer.indexOf(this.delimeter);
            /**
             * Check if the buffer has the delimeter (#),
             * if not, the end of the buffer string might be in the middle of a content length string
             */
            if (i !== -1) {
                const rawContentLength = this.buffer.substring(0, i);
                this.contentLength = parseInt(rawContentLength, 10);
                if (isNaN(this.contentLength)) {
                    this.contentLength = null;
                    this.buffer = '';
                    throw new corrupted_packet_length_exception_1.CorruptedPacketLengthException(rawContentLength);
                }
                this.buffer = this.buffer.substring(i + 1);
            }
        }
        if (this.contentLength !== null) {
            const length = this.buffer.length;
            if (length === this.contentLength) {
                this.handleMessage(this.buffer);
            }
            else if (length > this.contentLength) {
                const message = this.buffer.substring(0, this.contentLength);
                const rest = this.buffer.substring(this.contentLength);
                this.handleMessage(message);
                this.onData(rest);
            }
        }
    }
    handleMessage(data) {
        this.contentLength = null;
        this.buffer = '';
        let message;
        try {
            message = JSON.parse(data);
        }
        catch (e) {
            throw new invalid_json_format_exception_1.InvalidJSONFormatException(e, data);
        }
        message = message || {};
        this.socket.emit(constants_1.MESSAGE_EVENT, message);
    }
    formatMessageData(message) {
        const messageData = JSON.stringify(message);
        const length = messageData.length;
        const data = length + this.delimeter + messageData;
        return data;
    }
}
exports.JsonSocket = JsonSocket;
