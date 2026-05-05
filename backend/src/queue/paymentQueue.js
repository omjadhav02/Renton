import { Queue } from "bullmq"
import IORedis from "ioredis"
import { connection } from "../config/redis.js";

export const paymentQueue = new Queue("payment-queue", {
    connection,
})