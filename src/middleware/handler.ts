import { ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';
import ApiError from '@src/utils/ApiError';
import logger from '@src/config/logger';

const errorConvertor: ErrorRequestHandler = (err: Error, _, __, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    const message = String(httpStatus[statusCode]);
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

const customErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let { statusCode, message } = err as ApiError;

  if (process.env.NODE_ENV === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = String(httpStatus[httpStatus.INTERNAL_SERVER_ERROR]);
  }

  res.locals.errorMessage = err.message;

  const errorResponse = {
    error: [
      {
        extensions: {
          code: statusCode,
          path: process.env.NODE_ENV === 'development' ? err.stack : '',
        },
        message,
      },
    ],
  };

  if (process.env.NODE_ENV === 'development') {
    logger.error(err);
  }

  res.status(statusCode).send(errorResponse);
};

export { customErrorHandler, errorConvertor };
