import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { ClientController } from './client/client.controller';
import { ClientModule } from './client/client.module';
import { UserModule } from './user/user.module';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { HttpErrorFilter } from './shared/http.error.filter';
import { LogginInterceptor } from './shared/logging.interceptor';
import { ValidationPipe } from './shared/validation.pipe';

@Module({
  imports: [
    TypeOrmModule.forRoot(),    
    ProductModule,  ClientModule, UserModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LogginInterceptor,
    },
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidationPipe,
    // },
  
  ],
})
export class AppModule {}
