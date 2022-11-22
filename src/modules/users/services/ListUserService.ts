import User from '../typeorm/entities/User';

import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UsersRepository';

export default class ListUserService {
    public async execute(): Promise<User[]> {
        return getCustomRepository(UserRepository).find();
    }
}
