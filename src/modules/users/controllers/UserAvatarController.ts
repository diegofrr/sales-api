import { Request, Response } from 'express';
import UpadteAvatarService from '../services/UpdateUserAvatarService';

export default class UserAvatarController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const updateAvatar = new UpadteAvatarService();
        const user = updateAvatar.execute({
            user_id: request.user.id,
            avatarFilename: String(request.file?.filename),
        });

        return response.json(user);
    }
}
