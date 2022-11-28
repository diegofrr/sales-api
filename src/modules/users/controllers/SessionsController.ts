import { Request, Response } from 'express';
import CreateSessionsService from '../services/CreateSessionsService';
import UserRepository from '../typeorm/repositories/UsersRepository';

export default class SessionsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email, password } = request.body;
        const createSession = new CreateSessionsService();
        const usersRepository = new UserRepository();

        const data = await createSession.execute({ email, password });
        const { user, token } = data;
        const userDTO = await usersRepository.toDTO(user);
        const responseData = { ...userDTO, token };

        return response.json(responseData);
    }
}
