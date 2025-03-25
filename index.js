import express from 'express'
import 'dotenv/config'
import connectDB from './database/client.js'
import authRouter from "./routes/auth.js";
import events from "./routes/events.js";
import servicesRouter from './routes/services.js'

import cors from 'cors';


const app = express();
const port = process.env.port || 8000;

app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cors());

app.use('/api', authRouter, events, servicesRouter);

connectDB()
app.listen(8000, () => {
    console.log(`Server is running on port ${port}`);
})