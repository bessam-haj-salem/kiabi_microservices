import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { ClientController } from './client/client.controller';
import { ClientModule } from './client/client.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),    
    ProductModule,  ClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
