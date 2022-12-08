import CustomersRepository from '../typeorm/repositories/CustomersRepository';

import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Customer from '../typeorm/entities/Customers';

interface IRequest {
    id: string;
    name: string;
    email: string;
}

export default class UpdateCustomerService {
    public async execute({ id, name, email }: IRequest): Promise<Customer> {
        const customersRepository = getCustomRepository(CustomersRepository);

        const customer = await customersRepository.findById(id);

        if (!customer) {
            throw new AppError('Customer not found.');
        }

        const customerExists = await customersRepository.findByEmail(email);

        if (customerExists && customer.id !== id) {
            throw new AppError('Já existe um cliente com este e-mail.');
        }

        customer.name = name;
        customer.email = email;

        await customersRepository.save(customer);

        return customer;
    }
}
