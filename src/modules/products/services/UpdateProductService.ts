import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';

import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export class UpdateProductService {
    public async execute({
        id,
        name,
        price,
        quantity,
    }: IRequest): Promise<Product | undefined> {
        const productsRepository = getCustomRepository(ProductRepository);
        const product = await productsRepository.findOne(id);

        if (!product) {
            throw new AppError('Produto não encontrado!');
        }

        const productExists = await productsRepository.findByName(name);

        if (productExists && name !== product.name) {
            throw new AppError('Já existe um produto com este nome');
        }

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await productsRepository.save(product);

        return product;
    }
}
