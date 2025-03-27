import {Router} from 'express'
import { verifyUser } from "../middlewares/authMiddleware.js";
import { userProfile } from '../controllers/usersController.js'

const usersRouter = Router();

usersRouter.get('/profile', verifyUser, userProfile)

export default usersRouter;