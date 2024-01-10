import mongoose from "mongoose";

//  Data Base URL
import { DB_URL } from "../config/config.js";

// Function to connect to the mongoDB databse
export const connectToMongoDB = async () => {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
    }
}

