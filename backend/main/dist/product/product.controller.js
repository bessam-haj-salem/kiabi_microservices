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
exports.ProductController = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const product_service_1 = require("./product.service");
let ProductController = class ProductController {
    constructor(productService, httpService) {
        this.productService = productService;
        this.httpService = httpService;
    }
    async all() {
        return this.productService.all();
    }
    async like(id) {
        const product = await this.productService.findOne(id);
        this.httpService.post(`http://localhost:3000/api/products/${id}/like`, {}).subscribe(res => {
            console.log(res);
        });
        return this.productService.update(id, {
            likes: product.likes + 1
        });
    }
    async productCreated(product) {
        this.productService.create({
            id: product.id,
            title: product.title,
            image: product.image,
            likes: product.likes
        });
    }
    async productUpdated(product) {
        await this.productService.update(product.id, {
            id: product.id,
            title: product.title,
            image: product.image,
            likes: product.likes
        });
    }
    async productDeleted(id) {
        await this.productService.delete(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "all", null);
__decorate([
    (0, common_1.Post)(':id/like'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "like", null);
__decorate([
    (0, microservices_1.EventPattern)('product_created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "productCreated", null);
__decorate([
    (0, microservices_1.EventPattern)('product_updated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "productUpdated", null);
__decorate([
    (0, microservices_1.EventPattern)('product_deleted'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "productDeleted", null);
ProductController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [product_service_1.ProductService, axios_1.HttpService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map