import CustomersRepository from '../typeorm/repositories/CustomersRepository';

import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customers';

export default class ListCustomerService {
    public async execute(): Promise<Customer[]> {
        const customersRepository = getCustomRepository(CustomersRepository);

        const customers = await customersRepository.find();

        return customers;
    }
}
