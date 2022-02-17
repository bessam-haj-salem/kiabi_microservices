/// <reference types="node" />
import { Server } from 'net';
import { JsonSocket } from '../../helpers/json-socket';
export declare const ip = "127.0.0.1";
export declare function createServer(callback: (err?: any, server?: Server) => void): void;
export declare function createClient(server: Server, callback: (err?: any, clientSocket?: JsonSocket, serverSocket?: JsonSocket) => void): void;
export declare function createServerAndClient(callback: (err?: any, server?: Server, clientSocket?: JsonSocket, serverSocket?: JsonSocket) => void): void;
export declare function range(start: number, end: number): any[];
