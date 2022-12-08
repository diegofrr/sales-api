import UserRepository from '../typeorm/repositories/UsersRepository';

import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import { compare } from 'bcryptjs';

interface IRequest {
    user_id: string;
    name: string;
    email: string;
    password?: string;
    new_password?: string;
}

export default class UpdateProfileService {
    public async execute({
        user_id,
        name,
        email,
        password,
        new_password,
    }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UserRepository);

        const user = await usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found.');
        }

        const userUpdateEmail = await usersRepository.findByEmail(email);

        if (userUpdateEmail && userUpdateEmail.id !== user_id) {
            throw new AppError('Já existe um usuário com este e-mail.');
        }

        if (new_password && !password) {
            throw new AppError('A senha atual é necessária.');
        }

        if (new_password && password) {
            const checkPassword = await compare(password, user.password);

            if (!checkPassword) {
                throw new AppError('Senha atual inválida!');
            }

            user.password = new_password;
        }

        user.name = name;
        user.email = email;

        await usersRepository.save(user);

        return user;
    }
}
