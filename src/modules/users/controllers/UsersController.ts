import { NextFunction, Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListUserService from '../services/ListUserService';
import UserRepository from '../typeorm/repositories/UsersRepository';

export default class UsersController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listUser = new ListUserService();
        const users = await listUser.execute();

        return response.json({ amount: users.length, users });
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, password } = request.body;
        const usersRepository = new UserRepository();

        const createUser = new CreateUserService();
        const user = await createUser.execute({ name, email, password });
        const userDTO = await usersRepository.toDTO(user);

        return response.json(userDTO);
    }
}
