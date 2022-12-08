import UserRepository from '../typeorm/repositories/UsersRepository';

import { getCustomRepository } from 'typeorm';
import { toDTO, UserDTO } from '../utils/toDTO';
import AppError from '@shared/errors/AppError';

interface IRequest {
    user_id: string;
}

export default class ShowProfileService {
    public async execute({ user_id }: IRequest): Promise<UserDTO> {
        const usersRepository = getCustomRepository(UserRepository);

        const user = await usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found.');
        }

        const userDTO = toDTO(user);

        return userDTO;
    }
}
