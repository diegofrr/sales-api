import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';

import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UsersRepository';
import { sign } from 'jsonwebtoken';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

export default class CreateSessionsService {
    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const usersRepository = getCustomRepository(UserRepository);
        const user = await usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        if (!(await usersRepository.checkPassword(password, user.password))) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const token = sign({}, '8b1867dfd7d69de00c608a981e72b7cc', {
            subject: user.id,
            expiresIn: '1d',
        });

        return {
            user,
            token,
        };
    }
}
