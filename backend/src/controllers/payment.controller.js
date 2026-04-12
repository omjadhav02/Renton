import prisma from "../config/prisma.js"
import { razorpay } from "../utils/razorpay.js"
import crypto from "crypto";

export const createOrder = async (req, res) => {
    try {
        const { bookingId } = req.body;

        const booking = await prisma.booking.findUnique({
            where: { id: bookingId },
            include: { property: true },
        })

        if(!booking || !booking.property){
            return res.status(404).json({message: "Booking not found!"})
        }

        const existingPayment = await prisma.payment.findUnique({
            where: { bookingId }
        });

        if (existingPayment) {
            return res.json({
                orderId: existingPayment.razorpayOrderId,
                amount: existingPayment.amount
            });
        }

        const amount = booking.property.price;

        const order = await razorpay.orders.create({
            amount: amount * 100, 
            currency: "INR",
        })

        await prisma.payment.create({
            data: {
                bookingId,
                amount,
                status: "pending",
                razorpayOrderId: order.id
            }
        })

        res.json({
            orderId: order.id,
            amount
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

        await prisma.payment.update({
            where: { bookingId },
            data: {
                status: "success",
                razorpayPaymentId: razorpay_payment_id,
            }
        })

        res.json({message: "Payment Verified!"})


    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getPayments = async (req, res) => {
    try {
        const payments = await prisma.payment.findMany({
            include: {
                booking: {
                    include:{
                        property: {
                            select: {
                                title: true,
                                city: true,
                                price: true,
                                images: true,
                            }
                        },
                        tenant: {
                            select: {
                                name: true,
                                email: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        res.json(payments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}