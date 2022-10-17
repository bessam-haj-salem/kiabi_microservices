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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const common_1 = require("@nestjs/common");
const client_dto_1 = require("./client.dto");
const validation_pipe_1 = require("../shared/validation.pipe");
const client_service_1 = require("./client.service");
let ClientController = class ClientController {
    constructor(clientService) {
        this.clientService = clientService;
    }
    async all() {
        let allclients = this.clientService.all();
        return allclients;
    }
    async create(data) {
        console.log("data new client");
        console.log(data);
        const client = await this.clientService.create(data);
        return client;
    }
    async get(id) {
        console.log("*****id");
        console.log(id);
        return this.clientService.get(id);
    }
    async update(id, raison_social, num_sirette, adresse, email, telephone) {
        console.log(raison_social);
        await this.clientService.update(id, { raison_social, num_sirette, adresse, email, telephone });
        const client = await this.clientService.get(id);
        console.log(client);
        return client;
    }
    async delete(id) {
        console.log(" id to delete");
        console.log(id);
        await this.clientService.delete(id);
        return id;
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "all", null);
__decorate([
    (0, common_1.Post)('add'),
    (0, common_1.UsePipes)(new validation_pipe_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_dto_1.ClientDTO]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "get", null);
__decorate([
    (0, common_1.Put)('edit/:id'),
    (0, common_1.UsePipes)(new validation_pipe_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('raison_social')),
    __param(2, (0, common_1.Body)('num_sirette')),
    __param(3, (0, common_1.Body)('adresse')),
    __param(4, (0, common_1.Body)('email')),
    __param(5, (0, common_1.Body)('telephone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "delete", null);
ClientController = __decorate([
    (0, common_1.Controller)('clients'),
    __metadata("design:paramtypes", [client_service_1.ClientService])
], ClientController);
exports.ClientController = ClientController;
//# sourceMappingURL=client.controller.js.map