import { useState } from "react";
import { createOrder, pollPayment, verifyPayments } from "../services/payment.service";
import toast from "react-hot-toast"

export const useHandlePayments = ({booking}) => {

    const [loading, setLoading] = useState(false);

    const handlePay = async () => {
        setLoading(true);
        try {
            const data = await createOrder({bookingId: booking.id});

           const payment = await pollPayment(data.paymentId);

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY,
                amount: payment.amount * 100,
                order_id: payment.razorpayOrderId,

                handler: async (response) => {
                    await verifyPayments({ ...response,bookingId: booking.id })
                    toast.success("Payment successful!")
                    window.location.reload();
                }
            }

            const rzp = new window.Razorpay(options);

            rzp.on("payment.failed", function (response) {
                toast.error("Payment failed ❌");
                console.error(response.error);
            });

            rzp.open();
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || error.message);
        } finally {
            setLoading(false)
        }
    }

    return { handlePay, loading }
}