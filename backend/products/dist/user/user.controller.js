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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_decorator_1 = require("./user.decorator");
const microservices_1 = require("@nestjs/microservices");
let UserController = class UserController {
    constructor(userService, client) {
        this.userService = userService;
        this.client = client;
    }
    showAllUsers(user) {
        console.log(user);
        return this.userService.showAll();
    }
    async register(user) {
        console.log("************************ user***************");
        console.log(user);
        const newuser = await this.userService.register(user);
        return newuser;
    }
    async updateIdea(user) {
        console.log(user);
        const newuser = await this.userService.update(user.id, user);
        return newuser;
    }
    async delete(id) {
        await this.userService.delete(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.User)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "showAllUsers", null);
__decorate([
    (0, microservices_1.EventPattern)('user_created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, microservices_1.EventPattern)('user_updated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateIdea", null);
__decorate([
    (0, microservices_1.EventPattern)('user_deleted'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
UserController = __decorate([
    (0, common_1.Controller)('api/users'),
    __param(1, (0, common_1.Inject)('PRODUCT_SERVICE')),
    __metadata("design:paramtypes", [user_service_1.UserService, microservices_1.ClientProxy])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map