import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UsersRepository';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';

import { getCustomRepository } from 'typeorm';

interface IRequest {
    user_id: string;
    avatarFilename: string;
}

export default class UpadteAvatarService {
    public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UserRepository);
        const user = await usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('Usuário não encontrado.');
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar,
            );
            const userAvatarFileExists = await fs.promises.stat(
                userAvatarFilePath,
            );

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;
        await usersRepository.save(user);

        return user;
    }
}
