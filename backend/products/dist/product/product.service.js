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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const client_entity_1 = require("../client/client.entity");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./product.entity");
let ProductService = class ProductService {
    constructor(productRepository, clientRepository) {
        this.productRepository = productRepository;
        this.clientRepository = clientRepository;
        this.connection = (0, typeorm_2.getConnection)();
    }
    ensureOwnerShip(product, clientId) {
        if (product.client.id !== clientId) {
            throw new common_1.HttpException('Incorrect client', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async showAll() {
        const products = await this.productRepository.find({ relations: ['client'] });
        return products;
    }
    async showAll1(clientId) {
        const products = await this.connection.query(`SELECT ref_product, nom_product, description, price, clientId FROM product WHERE clientId = ${clientId} `);
        return products;
    }
    async create(clientID, data) {
        const client = await this.clientRepository.findOne({ where: { id: clientID } });
        console.log("notre client*******");
        console.log(client);
        const product = await this.productRepository.create(Object.assign(Object.assign({}, data), { client: client }));
        const created = await this.productRepository.save(product);
        return created;
    }
    async read(id) {
        common_1.Logger.log(id);
        const product = await this.productRepository.findOne({ where: { id }, relations: ['client'] });
        if (!product) {
            throw new common_1.HttpException('Not found', common_1.HttpStatus.NOT_FOUND);
        }
        return product;
    }
    async update(clientID, data) {
        let product = await this.productRepository.findOne({ where: { clientID }, relations: ['client'] });
        common_1.Logger.log(product);
        if (!product) {
            throw new common_1.HttpException('Not found', common_1.HttpStatus.NOT_FOUND);
        }
        this.ensureOwnerShip(product, clientID);
        await this.productRepository.update(clientID, data);
        product = await this.productRepository.findOne({ where: { clientID }, relations: ['client'] });
        return product;
    }
    async destroy(clientID) {
        const product = await this.productRepository.findOne({ where: { clientID }, relations: ['client'] });
        if (!product) {
            throw new common_1.HttpException('Not found', common_1.HttpStatus.NOT_FOUND);
        }
        await this.productRepository.delete(clientID);
        return clientID;
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(client_entity_1.Client)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map