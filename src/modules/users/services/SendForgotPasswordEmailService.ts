import AppError from '@shared/errors/AppError';

import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import EtherealMail from '@config/mail/EtherealMail';

interface IRequest {
    email: string;
}

export default class SendForgotPasswordEmailService {
    public async execute({ email }: IRequest): Promise<void> {
        const usersRepository = getCustomRepository(UserRepository);
        const userTokensRepository = getCustomRepository(UserTokensRepository);

        const user = await usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("User doesn't exists.");
        }

        const token = await userTokensRepository.generate(user.id);

        await EtherealMail.sendMail({
            to: email,
            body: `Token de redefinição: ${token?.token}`,
        });
    }
}
