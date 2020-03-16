import redis from "redis";
import connectRedis from "connect-redis";
import session from "express-session";

const createRedisStore = () => {
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient({ host: process.env.REDIS_HOST });

  return new RedisStore({ client: redisClient });
};

export const initSession = server => {
  server.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      name: process.env.SESSION_NAME,
      saveUninitialized: false,
      cookie: { domain: process.env.DOMAIN },
      store:
        process.env.SESSION_TYPE === "redis"
          ? createRedisStore()
          : new session.MemoryStore()
    })
  );
};
