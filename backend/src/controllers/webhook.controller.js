import crypto from "crypto";
import prisma from "../config/prisma.js";

export const razorpayWebhook = async (req, res) => {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const shasum = crypto.createHmac("sha256", secret);

    shasum.update(req.body);

    const digest = shasum.digest("hex");

    if(digest !== req.headers["x-razorpay-signature"]){
        return res.status(400).json({message: "Invalid signature"})
    }

    const event = req.body;

    if(event.event === "payment.captured"){
        const orderId = event.payload.payment.entity.order_id;

        await prisma.payment.updateMany({
            where: { razorpayOrderId: orderId },
            data: { status: "success" },
        })
    }

    res.json({ status: "ok" });
}