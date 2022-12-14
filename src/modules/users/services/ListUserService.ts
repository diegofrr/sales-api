import UserRepository from '../typeorm/repositories/UsersRepository';

import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';

export default class ListUserService {
    public async execute(): Promise<User[]> {
        const usersRepository = getCustomRepository(UserRepository);

        const users = await usersRepository.find();

        return users;
    }
}
