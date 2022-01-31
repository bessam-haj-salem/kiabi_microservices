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
exports.ClientService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const client_model_1 = require("./client.model");
let ClientService = class ClientService {
    constructor(clientModel) {
        this.clientModel = clientModel;
    }
    async all() {
        return this.clientModel.find().exec();
    }
    async create(data) {
        return new this.clientModel(data).save();
    }
    async findOne(id) {
        return this.clientModel.findOne({ id });
    }
    async update(id, data) {
        console.log(id);
        console.log(data);
        return this.clientModel.findOneAndUpdate({ id }, data);
    }
    async delete(id) {
        console.log(`client id to delete ${id}`);
        await this.clientModel.deleteOne({ id });
    }
};
ClientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(client_model_1.Client.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ClientService);
exports.ClientService = ClientService;
//# sourceMappingURL=client.service.js.map