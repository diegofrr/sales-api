import User from '../typeorm/entities/User';

import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UsersRepository';

interface UserDTO {
    name: string;
    email: string;
    avatar: string;
}

export default class ListUserService {
    public async execute(): Promise<UserDTO[]> {
        const usersRepository = getCustomRepository(UserRepository);

        const users = await usersRepository.find();
        const usersList = [] as UserDTO[];

        users.forEach(u => {
            usersList.push({
                name: u.name,
                email: u.email,
                avatar: u.avatar,
            });
        });

        return usersList;
    }
}
