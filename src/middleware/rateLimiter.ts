import rateLimiter from 'express-rate-limit';

const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: 'too many request from this ip' },
  standardHeaders: true,
  legacyHeaders: false,
});

export default limiter;
