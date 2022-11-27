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

interface NotChangedProductProps {
    product: Product;
    name: string;
    price: number;
    quantity: number;
}

function notChangedProduct({
    product,
    name,
    price,
    quantity,
}: NotChangedProductProps): boolean {
    if (
        product.name == name &&
        product.price == price &&
        product.quantity == quantity
    ) {
        return true;
    }
    return false;
}

class UpdateProductService {
    public async execute({
        id,
        name,
        price,
        quantity,
    }: IRequest): Promise<Product | undefined | string> {
        const productsRepository = getCustomRepository(ProductRepository);
        const product = await productsRepository.findOne(id);

        if (!product) {
            throw new AppError('Produto não encontrado!');
        }

        if (notChangedProduct({ product, name, price, quantity })) {
            throw new AppError('Nada alterado.');
        }

        const productExists = await productsRepository.findByName(name);

        if (productExists && productExists.id !== id) {
            throw new AppError('Já existe um produto com este nome');
        }

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await productsRepository.save(product);

        return product;
    }
}

export default UpdateProductService;
