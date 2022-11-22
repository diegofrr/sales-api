import { EntityRepository, Repository } from 'typeorm';
import Product from '../entities/Product';

export interface ProductDTO {
    name: string;
    price: number;
    quantity: number;
    created_at: Date;
    updated_at: Date;
}

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
    public async findByName(name: string): Promise<Product | undefined> {
        const product = this.findOne({
            where: {
                name,
            },
        });

        return product;
    }

    public toDTO(product: Product): ProductDTO {
        return {
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            created_at: product.created_at,
            updated_at: product.updated_at,
        };
    }
}
