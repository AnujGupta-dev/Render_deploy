import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbconnect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected');
  } catch (err) {
    console.error('Database connection error:', err);
  }
};

export default dbconnect ;