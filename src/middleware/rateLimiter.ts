import rateLimiter from 'express-rate-limit';

const errorMessageResponse = {
  error: [
    {
      extensions: {
        code: 429,
        path: 'express rate limiter',
      },
      message: 'maximum requests exceeded',
    },
  ],
};

const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: errorMessageResponse,
  standardHeaders: true,
  legacyHeaders: false,
});

export default limiter;
