import Product from '../typeorm/entities/Product';

export interface ProductDTO {
    id: string;
    name: string;
    price: number;
    quantity: number;
    created_at: Date;
    updated_at: Date;
}

export default function toDTO(product: Product): ProductDTO {
    return {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        created_at: product.created_at,
        updated_at: product.updated_at,
    };
}
