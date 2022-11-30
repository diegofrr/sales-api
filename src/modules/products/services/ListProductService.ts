import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import toDTO, { ProductDTO } from '../utils/toDTO';

class ListProductService {
    public async execute(): Promise<ProductDTO[]> {
        const productsRepository = getCustomRepository(ProductRepository);

        const products = await productsRepository.find();
        const productsList = [] as ProductDTO[];

        products.forEach(p => {
            productsList.push(toDTO(p));
        });

        return productsList;
    }
}

export default ListProductService;
