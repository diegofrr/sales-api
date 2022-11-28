import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UsersRepository';
import authConfig from '@config/auth';

import { getCustomRepository } from 'typeorm';
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

        const userDTO = usersRepository.toDTO(user);

        const token = sign(userDTO, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        });

        return {
            user,
            token,
        };
    }
}
