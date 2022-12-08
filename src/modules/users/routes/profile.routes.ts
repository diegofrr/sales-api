import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(isAuthenticated);

profileRouter.get('/', profileController.show);

profileRouter.put(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).max(12),
            new_password: Joi.string().min(8).max(12).optional(),
            password_confirmation: Joi.string()
                .valid(Joi.ref('new_password'))
                .when('new_password', {
                    is: Joi.exist(),
                    then: Joi.required(),
                }),
        },
    }),
    profileController.update,
);

export default profileRouter;
