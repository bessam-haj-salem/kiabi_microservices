"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let ValidationPipe = class ValidationPipe {
    async transform(value, { metatype }) {
        if (value instanceof Object && this.isEmpty(value)) {
            console.log("******empty case");
            throw new common_1.HttpException('Validation failed: No body submitted', common_1.HttpStatus.BAD_REQUEST);
        }
        if (!metatype || !this.validateMetaType(metatype)) {
            return value;
        }
        const object = (0, class_transformer_1.plainToInstance)(metatype, value);
        console.log(object);
        const errors = await (0, class_validator_1.validate)(object);
        console.log(`errrors of ${typeof object}`);
        console.log(errors);
        if (errors.length > 0) {
            console.log("******error case");
            throw new common_1.HttpException(`Validation failed: ${this.formErrors(errors)}`, common_1.HttpStatus.BAD_REQUEST);
        }
        return value;
    }
    validateMetaType(metatype) {
        const types = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
    formErrors(errors) {
        return errors.map(err => {
            for (let property in err.constraints) {
                return err.constraints[property];
            }
        }).join(', ');
    }
    isEmpty(value) {
        if (value) {
            return false;
        }
        return true;
    }
};
ValidationPipe = __decorate([
    (0, common_1.Injectable)()
], ValidationPipe);
exports.ValidationPipe = ValidationPipe;
//# sourceMappingURL=validation.pipe.js.map