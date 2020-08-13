import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '../middleware/ensureAuthenticated';

const profileRouter = Router();
profileRouter.use(ensureAuthenticated);

const profilecontroller = new ProfileController();

profileRouter.get('/', profilecontroller.show);
profileRouter.put('/', profilecontroller.update);

export default profileRouter;
