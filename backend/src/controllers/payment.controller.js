import prisma from "../config/prisma.js"
import { getPaymentQueue } from "../queue/paymentQueue.js";
import { razorpay } from "../config/razorpay.js"
import crypto from "crypto";

export const createOrder = async (req, res) => {
    try {
        const { bookingId } = req.body;

        const booking = await prisma.booking.findUnique({
            where: { id : bookingId },
            include: { property: true },
        })

        if(!booking || !booking.property){
            return res.status(404).json({message: "Booking not found!"})
        }

        const ownerId = booking.property.ownerId;

        if(!ownerId ) {
            return res.status(404).json({message: "Owner not found!"})
        }

        const payment = await prisma.payment.upsert({
            where: { bookingId },
            update: {},
            create: {
                bookingId,
                ownerId,
                amount: booking.property.price,
                status:"pending",
            }
        })
        const paymentQueue = getPaymentQueue();

        await paymentQueue.add("create-order", {
            paymentId: payment.id,
        })
    
        res.json({
            message: "Order is being processed",
            paymentId: payment.id,
        })

    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error("Create Order Error:", error);
    }
}

export const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            bookingId
        } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET).update(body).digest("hex");

        if(expectedSignature !== razorpay_signature){
            return res.status(400).json({message: "Invalid signature" })
        }

        const payment = await prisma.payment.findUnique({
            where: { bookingId },
        })

        if(!payment){
            return res.status(404).json({ message: "Payment not found"})
        }

        if(payment.status === "success"){
            return res.json({ message: "Already verified"})
        }

        await prisma.payment.update({
            where: { bookingId },
            data: {
                status: "success",
                razorpayPaymentId: razorpay_payment_id,
            }
        })

        await prisma.booking.update({
            where: { id: bookingId },
            data: { status: "approved" }
        })

        res.json({message: "Payment Verified!"})

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getPayments = async (req, res) => {
    try {
        const ownerId = req.user.userId;
        const page = parseInt(req.query.page) || 0;

        const payments = await prisma.payment.findMany({
            take: 20,
            skip: page * 20,
            orderBy: { createdAt: "desc" },
            where: { ownerId }, 
            include: {
                booking: {
                    include: {
                        tenant: true,
                        property: {
                            include: {
                                images: true,
                            }
                        }
                    }
                }
            }
        })

        res.json(payments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
}

export const getPaymentById = async (req, res) => {
    try {
        const { paymentId } = req.params;

        const payment = await prisma.payment.findUnique({
            where: { id: paymentId },
        })

        if(!payment) {
            return res.status(404).json({message: "Not found"});
        }

        res.json(payment);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getPaymentStatus = async (req, res) => {
    try {
        const { bookingId } = req.params;

        const paymentStatus = await prisma.payment.findUnique({
            where: { bookingId: bookingId},
            select: {
                status: true,
            }
        })        

        res.json(paymentStatus);

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}