import mongoose from 'mongoose';
import { MONGO_DB_URI } from './config.js';

export async function connectDB() {
  try {
    const db = await mongoose.connect(MONGO_DB_URI);
    console.log(`Connected to ${db.connection.name} db`);
  } catch (error) {
    console.log(error);
  }
}
