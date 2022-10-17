"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const client_service_1 = require("./client.service");
let ClientController = class ClientController {
    constructor(clientService, httpService) {
        this.clientService = clientService;
        this.httpService = httpService;
        this.count = 0;
    }
    async all() {
        return this.clientService.all();
    }
    async clientCreated(client) {
        console.log("my new client");
        console.log(client);
        this.clientService.create({
            id: client.id,
            raison_social: client.raison_social,
            num_sirette: client.num_sirette,
            adresse: client.adresse,
            email: client.email,
            telephone: client.telephone
        });
    }
    async clientUpdated(client) {
        console.log("********mynew client");
        console.log(client);
        const updatedclient = await this.clientService.findOne(client.id);
        if (updatedclient) {
            await this.clientService.update(client.id, {
                id: client.id,
                raison_social: client.raison_social,
                num_sirette: client.num_sirette,
                adresse: client.adresse,
                email: client.email,
                telephone: client.telephone
            });
        }
    }
    async clientDeleted(id) {
        const deletedclient = await this.clientService.findOne(id);
        console.log("deleted client");
        console.log(deletedclient);
        console.log(`client id to delete ${id}`);
        if (deletedclient) {
            await this.clientService.delete(id);
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "all", null);
__decorate([
    (0, microservices_1.EventPattern)('client_created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "clientCreated", null);
__decorate([
    (0, microservices_1.EventPattern)('client_updated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "clientUpdated", null);
__decorate([
    (0, microservices_1.EventPattern)('client_deleted'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "clientDeleted", null);
ClientController = __decorate([
    (0, common_1.Controller)('clients'),
    __metadata("design:paramtypes", [client_service_1.ClientService, axios_1.HttpService])
], ClientController);
exports.ClientController = ClientController;
//# sourceMappingURL=client.controller.js.map