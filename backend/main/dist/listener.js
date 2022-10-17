"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: [
                'amqps://irdvzayl:yl69j2GXNVVUs6RXXdZSJT_T2wmlsYuN@beaver.rmq.cloudamqp.com/irdvzayl',
            ],
            queue: 'main_queue',
            queueOptions: {
                durable: false,
            },
        },
    });
    await app.listen();
}
bootstrap();
//# sourceMappingURL=listener.js.map