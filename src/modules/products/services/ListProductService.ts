import Product from '../typeorm/entities/Product';

import { getCustomRepository } from 'typeorm';
import {
    ProductDTO,
    ProductRepository,
} from '../typeorm/repositories/ProductsRepository';

class ListProductService {
    public async execute(): Promise<ProductDTO[]> {
        const productsRepository = getCustomRepository(ProductRepository);

        const products = await productsRepository.find();
        const productsList = [] as ProductDTO[];

        products.forEach(p => {
            productsList.push(productsRepository.toDTO(p));
        });

        return productsList;
    }
}

export default ListProductService;
