import rateLimiter from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { cacheStorage } from '@src/utils/cacheStorage';

const MAX_REQUESTS_ALLOWED_PER_IP = 10;
const MAX_WINDOW_SIZE_MS = 0.5 * 60 * 1000; // 0.5 mins

const errorMessageResponse = {
  error: [
    {
      extensions: {
        code: 429,
        path: 'rate limiter',
      },
      message: `maximum requests exceeded, please try after, ${MAX_WINDOW_SIZE_MS}`,
    },
  ],
};

const client = cacheStorage.store.getClient();

const limiter = rateLimiter({
  windowMs: MAX_WINDOW_SIZE_MS,
  max: MAX_REQUESTS_ALLOWED_PER_IP,
  message: errorMessageResponse,
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({
    // @ts-expect-error - Known issue: the `call` function is not present in @types/ioredis
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    sendCommand: (...args: string[]) => client.call(...args),
  }),
});

export default limiter;
