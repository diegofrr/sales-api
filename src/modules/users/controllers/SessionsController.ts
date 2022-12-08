import CreateSessionsService from '../services/CreateSessionsService';

import { Request, Response } from 'express';
import { toDTO } from '../utils/toDTO';

export default class SessionsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email, password } = request.body;
        const createSession = new CreateSessionsService();

        const data = await createSession.execute({ email, password });
        const { user, token } = data;
        const responseData = { ...toDTO(user), token };

        return response.json(responseData);
    }
}
