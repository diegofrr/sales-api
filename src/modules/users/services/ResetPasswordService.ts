import AppError from '@shared/errors/AppError';
import UserRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';

import { getCustomRepository } from 'typeorm';
import { isAfter, addHours } from 'date-fns';

interface IRequest {
    token: string;
    password: string;
}

export default class ResetPasswordService {
    public async execute({ token, password }: IRequest): Promise<void> {
        const usersRepository = getCustomRepository(UserRepository);
        const userTokensRepository = getCustomRepository(UserTokensRepository);

        const userToken = await userTokensRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('Invalid Token');
        }

        const user = await usersRepository.findById(userToken.user_id);

        if (!user) {
            throw new AppError("User doesn't exists.");
        }

        const tokenCreatedAt = userToken.created_at;
        // Verifica se já passou 2h da data de criação
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Expired Token');
        }

        user.password = password;
    }
}
