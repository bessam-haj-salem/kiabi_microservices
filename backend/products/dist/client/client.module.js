"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const typeorm_1 = require("@nestjs/typeorm");
const client_controller_1 = require("./client.controller");
const client_entity_1 = require("./client.entity");
const client_service_1 = require("./client.service");
let ClientModule = class ClientModule {
};
ClientModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([client_entity_1.Client]),
            axios_1.HttpModule,
            microservices_1.ClientsModule.register([
                {
                    name: 'CLIENT_SERVICE',
                    transport: microservices_1.Transport.RMQ,
                    options: {
                        urls: ['amqps://irdvzayl:yl69j2GXNVVUs6RXXdZSJT_T2wmlsYuN@beaver.rmq.cloudamqp.com/irdvzayl'],
                        queue: 'product_queue',
                        queueOptions: {
                            durable: false
                        },
                    },
                },
            ]),
        ],
        controllers: [client_controller_1.ClientController],
        providers: [client_service_1.ClientService]
    })
], ClientModule);
exports.ClientModule = ClientModule;
//# sourceMappingURL=client.module.js.map