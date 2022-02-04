/* eslint-disable prettier/prettier */
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { ProductService } from './products.service';

@Controller('/products')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Post()
	async addProduct(
		@Body('title') prodTitle: string,
		@Body('description') prodDesc: string,
		@Body('price') prodPrice: number,
	) {
		const genProdId = await this.productService.insertProduct(
			prodTitle,
			prodDesc,
			prodPrice,
		);

		return { id: genProdId };
	}

	@Get()
	async getAllProducts() {
		return await this.productService.getProducts();
	}

	@Get(':id')
	async getProduct(@Param('id') id: string) {
		return await this.productService.getProduct(id);
	}

	@Patch(':id')
	async updateProduct(
		@Param('id') id: string,
		@Body('title') title: string,
		@Body('description') desc: string,
		@Body('price') price: number,
	) {
		return await this.productService.updateProduct(id, title, desc, price);
	}

	@Delete(':id')
	async deleteProduct(@Param('id') id: string) {
		return await this.productService.deleteProduct(id);
	}
}
