import mongoose from 'mongoose'
import 'dotenv/config'

const connectDB =  async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log(`Successfully connected to the DB`);
    } catch (error) {
        console.error(`MongoDB connection error : ${error}`);

    }
}

export default connectDB;