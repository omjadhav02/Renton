import IORedis from "ioredis";

const redisUrl = process.env.NODE_ENV === "production" ? process.env.REDIS_URL : "redis://localhost:6379";

export const connection = new IORedis(redisUrl, {
  maxRetriesPerRequest: null,
  tls: {}
});