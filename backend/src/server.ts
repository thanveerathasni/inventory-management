import app from './app';
import { connectDB } from './config/database';
import { env } from './config/env';
import { logger } from './logger/logger';

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    app.listen(env.PORT, () => {
      logger.info(`Server is running on port ${env.PORT}`);
    });
  } catch (error) {
    logger.error(`Server startup failed: ${error}`);
    process.exit(1);
  }
};

void startServer();