import cacheManager from 'cache-manager';
import redisStore from 'cache-manager-ioredis';

const cacheStorage = cacheManager.caching({
  store: redisStore,
  host: 'localhost', // default value
  port: 6379, // default value
  db: 0,
});

export { cacheStorage };
