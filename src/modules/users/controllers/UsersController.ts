import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListUserService from '../services/ListUserService';
import { toDTO, UserDTO } from '../utils/toDTO';

export default class UsersController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listUser = new ListUserService();
        const users = await listUser.execute();

        const usersList = [] as UserDTO[];

        users.forEach(u => {
            usersList.push(toDTO(u));
        });

        return response.json({ amount: usersList.length, usersList });
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();
        const user = await createUser.execute({ name, email, password });

        return response.json(toDTO(user));
    }
}
