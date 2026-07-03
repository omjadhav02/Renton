import IORedis from "ioredis";

const redisUrl =
  process.env.NODE_ENV === "production"
    ? process.env.REDIS_URL
    : "redis://localhost:6379";

let connection = null;

export function getRedisConnection() {
  if (!connection) {
    connection = new IORedis(redisUrl, {
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
      enableOfflineQueue: false,
      retryStrategy: () => null,
    });

    connection.on("connect", () => {
      console.log("✅ Redis Connected");
    });

    connection.on("error", () => {
      // Suppress repeated ECONNREFUSED logs
    });
  }

  return connection;
}