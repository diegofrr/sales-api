import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';

import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import toDTO from '../utils/toDTO';

interface IRequest {
    id: string;
}

class ShowProductService {
    public async execute({ id }: IRequest): Promise<Product | undefined> {
        const productsRepository = getCustomRepository(ProductRepository);
        const product = await productsRepository.findOne(id);

        if (!product) {
            throw new AppError('Produto não encontrado!');
        }

        const productDTO = toDTO(product);

        return productDTO;
    }
}

export default ShowProductService;
