import dotenv from 'dotenv-safe';
import app from '@src/app';
import logger from './config/logger';

dotenv.config();

const PORT = process.env.PORT || '4001';

const server = app.listen(PORT, () => {
  logger.info(`✨ Server started 🚀 http://localhost:${PORT}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: unknown) => {
  logger.warn('💀 Shutting down due to unhandled error 💀');
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
