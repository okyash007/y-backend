import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI: string = process.env.MONGODB_URI!;
    
    if (!mongoURI) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }
    
    const conn = await mongoose.connect(mongoURI, {
      // Mongoose 6+ handles these options automatically
    });

    console.log(`MongoDB Connected: ${conn.connection.name}`);
    
    // Handle connection events
    mongoose.connection.on('connected', (): void => {
      console.log('Mongoose connected to MongoDB');
    });

    mongoose.connection.on('error', (err: Error): void => {
      console.error('Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', (): void => {
      console.log('Mongoose disconnected from MongoDB');
    });

    // Handle application termination
    process.on('SIGINT', async (): Promise<void> => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed due to application termination');
      process.exit(0);
    });

  } catch (error) {
    const err = error as Error;
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

export default connectDB;
