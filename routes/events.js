import {Router} from 'express'
import { verifyUser } from "../middlewares/authMiddleware.js";

const eventRouter = Router()

eventRouter.get('/events', verifyUser, (req, res) => {

    return res.status(200).json({message : 'Welcome to our events !'})
    
})

export default eventRouter;