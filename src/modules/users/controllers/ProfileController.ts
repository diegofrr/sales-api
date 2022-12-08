import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';
import { toDTO } from '../utils/toDTO';

export default class ProfileController {
    public async show(request: Request, response: Response): Promise<Response> {
        const showProfile = new ShowProfileService();
        const user_id = request.user.id;
        const user = await showProfile.execute({ user_id });

        const userDTO = toDTO(user);

        return response.json(userDTO);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, password, new_password } = request.body;
        const user_id = request.user.id;

        const updateProfile = new UpdateProfileService();

        const user = await updateProfile.execute({
            user_id,
            name,
            email,
            password,
            new_password,
        });

        return response.json(toDTO(user));
    }
}
