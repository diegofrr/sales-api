import Product from '../typeorm/entities/Product';

import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

class ListProductService {
    public async execute(): Promise<Product[]> {
        return getCustomRepository(ProductRepository).find();
    }
}

export default ListProductService;
