/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';

import { MongooseModule } from '@nestjs/mongoose';
@Module({
	imports: [
		ProductModule,
		MongooseModule.forRoot(
			'mongodb+srv://admin:admin1234@mern-auth-ititech.gusxu.mongodb.net/NestProducts?retryWrites=true&w=majority',
		),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
