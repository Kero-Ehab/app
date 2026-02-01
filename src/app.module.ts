import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TestController } from './test/test.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/ecommerce'), UserModule],
  controllers: [TestController],
  providers: [],
})
export class AppModule {}
