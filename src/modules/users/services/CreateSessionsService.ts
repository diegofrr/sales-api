import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';

import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UsersRepository';
import { compare } from 'bcryptjs';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
}

export default class CreateSessionsService {
    public async execute({ email, password }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UserRepository);
        const user = await usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        if (!(await usersRepository.checkPassword(password, user.password))) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        return user;
    }
}
