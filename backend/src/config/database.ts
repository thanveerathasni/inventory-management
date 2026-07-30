import mongoose from 'mongoose';

import { logger } from '../logger/logger';
import { env } from './env';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(env.MONGO_URI);

    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.error(`Database connection failed: ${error}`);

    process.exit(1);
  }
};