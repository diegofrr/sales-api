import { Request, Response } from 'express';

import CreateProductService from '../services/CreateProductService';
import ShowProductService from '../services/ShowProductService';
import ListProductService from '../services/ListProductService';
import UpdateProductService from '../services/UpdateProductService';
import DeleteProductService from '../services/DeleteProductService';
import toDTO, { ProductDTO } from '../utils/toDTO';
import AppError from '@shared/errors/AppError';

export default class ProductsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listProducts = new ListProductService();
        const products = await listProducts.execute();

        const productsList = [] as ProductDTO[];

        products.forEach(p => {
            productsList.push(toDTO(p));
        });

        return response.json({ amount: productsList.length, productsList });
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showProduct = new ShowProductService();
        const product = await showProduct.execute({ id });

        return response.json(toDTO(product));
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, price, quantity } = request.body;

        const createProduct = new CreateProductService();
        const product = await createProduct.execute({ name, price, quantity });

        return response.json(toDTO(product));
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, price, quantity } = request.body;
        const { id } = request.params;

        const updateProduct = new UpdateProductService();
        const product = await updateProduct.execute({
            id,
            name,
            price,
            quantity,
        });

        return response.json(toDTO(product));
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const deleteProduct = new DeleteProductService();
        await deleteProduct.execute({ id });

        return response.json([]);
    }
}
