/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';

@Injectable()
export class ProductService {
	constructor(
		@InjectModel('Product') private readonly productModel: Model<Product>,
	) {}

	async insertProduct(
		title: string,
		description: string,
		price: number,
	): Promise<string> {
		const product = new this.productModel({ title, description, price });

		const prod = await product.save();

		return prod.id;
	}

	async getProducts() {
		const products = await this.productModel.find().exec();

		return products.map((prod) => {
			return {
				id: prod.id,
				title: prod.title,
				description: prod.description,
				price: prod.price,
			};
		}) as Product[];
	}

	async getProduct(id: string) {
		const product = await this.findProductById(id);
		return {
			id: product.id,
			title: product.title,
			description: product.description,
			price: product.price,
		} as Product;
	}

	async updateProduct(
		id: string,
		title: string,
		description: string,
		price: number,
	) {
		const product = await this.findProductById(id);

		if (title) {
			product.title = title;
		}
		if (description) {
			product.description = description;
		}
		if (price) {
			product.price = price;
		}

		await product.save();
	}
	async deleteProduct(id: string) {
		const result = await this.productModel
			.findOneAndDelete({ _id: id })
			.exec();

		if (!result) {
			throw new NotFoundException('No Product Found');
		}
	}

	private async findProductById(id: string) {
		try {
			const product = await this.productModel.findById(id);

			if (!product) {
				throw new NotFoundException('No product found');
			}

			return product;
		} catch (error) {
			throw new NotFoundException('No product found');
		}
	}
}
