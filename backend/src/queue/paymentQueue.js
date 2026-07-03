import { Queue } from "bullmq";
import { getRedisConnection } from "../config/redis.js";

let paymentQueue = null;

export function getPaymentQueue() {
  if (!paymentQueue) {
    paymentQueue = new Queue("payment-queue", {
      connection: getRedisConnection(),
    });

    console.log("✅ Payment Queue initialized");
  }

  return paymentQueue;
}