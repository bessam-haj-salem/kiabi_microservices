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
const mongoose = require('mongoose');
const conn = mongoose.connection;
let ClientService = class ClientService {
    constructor(clientModel) {
        this.clientModel = clientModel;
        this.count = 0;
    }
    async all() {
        let res = await this.clientModel.find().exec();
        return res;
    }
    async create(data) {
        this.count++;
        console.log('connection closed');
        return new this.clientModel(data).save();
    }
    async findOne(id) {
        try {
            const clientSelected = this.clientModel.findOne({ id });
            return clientSelected;
        }
        catch (_a) {
            throw new common_1.HttpException('Not Found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async update(id, data) {
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