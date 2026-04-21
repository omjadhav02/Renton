import { Worker } from "bullmq";
import prisma from "../config/prisma.js";
import { razorpay } from "../utils/razorpay.js";
import IORedis from "ioredis"

const connection = new IORedis({
    maxRetriesPerRequest: null,
});

const worker = new Worker(
    "payment-queue",
    async (job) => {
        const { paymentId } = job.data;

        const payment = await prisma.payment.findUnique({
            where: { id: paymentId },
        })

        if(!payment || payment.razorpayOrderId) return;

        const order = await razorpay.orders.create({
            amount: payment.amount * 100,
            currency: "INR",
        })

        await prisma.payment.update({
            where: { id: paymentId },
            data: {
                razorpayOrderId: order.id,
                status: "created",
            } 
        })
    },
    { connection }
)

worker.on("failed", (job, err) => {
    console.error("Job failed:", job.id, err);
})

