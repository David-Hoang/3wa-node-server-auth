import {Router} from 'express'
import { createService, getAllServices, showService, updateService, deleteService } from '../controllers/servicesController.js'
import { verifyUser } from "../middlewares/authMiddleware.js";

const servicesRouter = Router()

servicesRouter.get('/services', getAllServices)
servicesRouter.post('/services', verifyUser, createService)
servicesRouter.get('/services/:id', verifyUser, showService)
servicesRouter.put('/services/:id', verifyUser, updateService)
servicesRouter.delete('/services/:id', verifyUser, deleteService)

export default servicesRouter