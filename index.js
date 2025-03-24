import express from 'express'
import 'dotenv/config'
import connectDB from './database/client.js'
import authRouter from "./routes/auth.js";

const app = express();
const port = process.env.port || 8000;

app.use(express.json());
app.use(express.urlencoded({extended : true}))

app.use('/api', authRouter);
app.use('/login', authRouter);

app.get('/api', (req, res) => {
    res.send('Welcome to my API');
})

connectDB()
app.listen(8000, () => {
    console.log(`Server is running on port ${port}`);
})