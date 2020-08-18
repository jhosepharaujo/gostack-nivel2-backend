import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '../middleware/ensureAuthenticated';

const profileRouter = Router();
profileRouter.use(ensureAuthenticated);

const profilecontroller = new ProfileController();

profileRouter.get('/', profilecontroller.show);
profileRouter.put(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            old_password: Joi.string(),
            password: Joi.string(),
            password_confirmation: Joi.string().valid(Joi.ref('password')),
        },
    }),
    profilecontroller.update,
);

export default profileRouter;
