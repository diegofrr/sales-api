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

        const user = await createSession.execute({ email, password });
        const userDTO = usersRepository.toDTO(user);

        return response.json(userDTO);
    }
}
