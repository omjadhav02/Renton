import { Worker } from "bullmq";
import prisma from "../config/prisma.js";
import { razorpay } from "../config/razorpay.js";
import { getRedisConnection } from "../config/redis.js";

async function startWorker() {
  let connection;

  try {
    connection = getRedisConnection();

    await connection.ping();

    console.log("✅ Payment Worker Started");

    const worker = new Worker(
      "payment-queue",
      async (job) => {
        const { paymentId } = job.data;

        const payment = await prisma.payment.findUnique({
          where: { id: paymentId },
        });

        if (!payment || payment.razorpayOrderId) return;

        const order = await razorpay.orders.create({
          amount: payment.amount * 100,
          currency: "INR",
        });

        await prisma.payment.update({
          where: { id: paymentId },
          data: {
            razorpayOrderId: order.id,
            status: "created",
          },
        });
      },
      {
        connection,
      }
    );

    worker.on("completed", (job) => {
      console.log(`✅ Job ${job.id} completed`);
    });

    worker.on("failed", (job, err) => {
      console.error(`❌ Job ${job?.id} failed:`, err);
    });

    worker.on("error", (err) => {
      console.error("Worker error:", err.message);
    });

  } catch (err) {
    console.log("⚠️ Redis is not running. Payment worker disabled.");
  }
}

startWorker();