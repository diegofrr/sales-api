import UserRepository from '../typeorm/repositories/UsersRepository';

import { getCustomRepository } from 'typeorm';
import { toDTO, UserDTO } from '../utils/toDTO';

export default class ListUserService {
    public async execute(): Promise<UserDTO[]> {
        const usersRepository = getCustomRepository(UserRepository);

        const users = await usersRepository.find();
        const usersList = [] as UserDTO[];

        users.forEach(u => {
            usersList.push(toDTO(u));
        });

        return usersList;
    }
}
