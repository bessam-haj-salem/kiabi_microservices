"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogginInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let LogginInterceptor = class LogginInterceptor {
    intercept(context, next) {
        const req = context.switchToHttp().getRequest();
        const method = req.method;
        const url = req.url;
        const now = Date.now();
        return next.handle().pipe((0, rxjs_1.tap)(() => {
            common_1.Logger.log(`${method} ${url} ${Date.now() - now}ms`, context.getClass().name);
        }));
    }
};
LogginInterceptor = __decorate([
    (0, common_1.Injectable)()
], LogginInterceptor);
exports.LogginInterceptor = LogginInterceptor;
//# sourceMappingURL=logging.interceptor.js.map