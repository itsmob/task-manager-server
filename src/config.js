import { config } from 'dotenv';

config();

export const TOKEN_SECRECT = process.env.TOKEN_SECRECT;

export const MONGO_DB_URI = process.env.DB_URI || 'mongodb://127.0.0.1:27017/backupdb';
