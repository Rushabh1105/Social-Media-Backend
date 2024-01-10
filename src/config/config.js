import dotenv from 'dotenv';

//Configure environment variables in the system
dotenv.config();

// Exporting various environment variables
export const PORT = process.env.PORT;
export const DB_URL = process.env.DB_URL;
export const JWT_KEY = process.env.JWT_KEY;
export const PASS = process.env.PASS;