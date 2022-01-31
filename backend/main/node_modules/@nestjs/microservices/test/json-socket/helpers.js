"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.range = exports.createServerAndClient = exports.createClient = exports.createServer = exports.ip = void 0;
const net_1 = require("net");
const constants_1 = require("../../constants");
const json_socket_1 = require("../../helpers/json-socket");
exports.ip = '127.0.0.1';
function createServer(callback) {
    const server = net_1.createServer();
    server.listen();
    server.on('listening', () => {
        callback(null, server);
    });
    server.on(constants_1.ERROR_EVENT, (err) => {
        callback(err);
    });
}
exports.createServer = createServer;
function createClient(server, callback) {
    const clientSocket = new json_socket_1.JsonSocket(new net_1.Socket());
    const address = server.address();
    if (!address) {
        throw new Error('server.address() returned null');
    }
    const port = address.port;
    clientSocket.connect(port, exports.ip);
    clientSocket.on(constants_1.ERROR_EVENT, (err) => {
        callback(err);
    });
    server.once('connection', socket => {
        const serverSocket = new json_socket_1.JsonSocket(socket);
        callback(null, clientSocket, serverSocket);
    });
}
exports.createClient = createClient;
function createServerAndClient(callback) {
    createServer((serverErr, server) => {
        if (serverErr) {
            return callback(serverErr);
        }
        createClient(server, (clientErr, clientSocket, serverSocket) => {
            if (clientErr) {
                return callback(clientErr);
            }
            callback(null, server, clientSocket, serverSocket);
        });
    });
}
exports.createServerAndClient = createServerAndClient;
function range(start, end) {
    const r = [];
    for (let i = start; i <= end; i++) {
        r.push(i);
    }
    return r;
}
exports.range = range;
