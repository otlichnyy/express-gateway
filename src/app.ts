import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv-safe';
import httpStatus from 'http-status';
import routes from '@src/routes/v1';
import { ErrorMiddleware, rateLimiter } from '@src/middleware';
import { successHandler, errorHandler } from '@src/config/morgan';
import ApiError from '@src/utils/ApiError';

dotenv.config();

const app = express();

// enable logging
if (process.env.NODE_ENV !== 'test') {
  app.use(successHandler);
  app.use(errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());

// v1 api routes
app.use('/v1', rateLimiter, routes);

// // send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// // convert error to ApiError, if needed
app.use(ErrorMiddleware.converter);

// // handle error
app.use(ErrorMiddleware.handler);

export default app;
