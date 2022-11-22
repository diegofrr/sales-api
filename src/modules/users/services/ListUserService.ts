import User from '../typeorm/entities/User';

import { getCustomRepository } from 'typeorm';
import UserRepository, {
    UserDTO,
} from '../typeorm/repositories/UsersRepository';

export default class ListUserService {
    public async execute(): Promise<UserDTO[]> {
        const usersRepository = getCustomRepository(UserRepository);

        const users = await usersRepository.find();
        const usersList = [] as UserDTO[];

        users.forEach(u => {
            usersList.push(usersRepository.toDTO(u));
        });

        return usersList;
    }
}
