import { IoCallOutline, IoCardSharp, IoChatbubbleEllipsesOutline, IoMailOutline, IoSendSharp, IoTrash } from "react-icons/io5";
import { createOrder, verifyPayments } from "../../features/payments/services/payment.service";
import toast from "react-hot-toast"
import { useState } from "react";

const Actions = ({booking, owner, onDelete, onChat }) => {

    const [loading, setLoading] = useState(false);

    const handlePay = async () => {
        setLoading(true);
        try {
            const data = await createOrder({bookingId: booking.id});
        

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY,
                amount: data.amount * 100,
                order_id: data.orderId,

                handler: async (response) => {
                    await verifyPayments({ ...response,bookingId: booking.id })

                    toast.success("Payment successful!")
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

    return (
        <div className="mt-4 space-y-4">

            {/* APPROVED */}
            {booking.status === "approved" && owner && (
            <div className="p-5 rounded-3xl bg-gradient-to-br from-gray-50 to-white space-y-5">

                {/* HEADER */}
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-black text-white">
                    <IoChatbubbleEllipsesOutline />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900">
                        Communication Hub
                    </h3>
                </div>

                {/* CONTACT */}
                <div>
                    <p className="text-xs text-gray-400 mb-2 font-medium">
                        Contact
                    </p>

                    <div className="flex flex-wrap gap-3">
                        {owner.phone && (
                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-900 font-medium hover:shadow-md transition cursor-pointer">
                                <IoCallOutline className="text-green-600" />
                                {owner.phone}
                            </div>
                        )}

                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-900 font-medium hover:shadow-md transition cursor-pointer">
                            <IoMailOutline className="text-blue-600" />
                            {owner.email}
                        </div>
                    </div>
                </div>
                {/* EMAIL ACTIONS */}
                <div>
                    <p className="text-xs text-gray-400 mb-2 font-medium">
                        Email Actions
                    </p>
                    <div className="flex gap-3 flex-wrap">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 transition" >
                                    <IoSendSharp/>
                                    Mail Owner 
                        </button>
                    </div>    
                </div>

                {/* CHAT */}
                <div>
                    <p className="text-xs text-gray-400 mb-2 font-medium">
                        Message
                    </p>

                    <button
                        onClick={() => onChat(owner)}
                        className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-black to-gray-800 text-white font-medium hover:scale-[1.02] transition"
                    >
                        <IoChatbubbleEllipsesOutline />
                        Chat
                    </button>
                </div>

                <div>
                    <p className="text-xs text-gray-400 mb-2 font-medium">
                        Payments
                    </p>
                    <button onClick={handlePay}
                    className="p-3 rounded-full flex items-center gap-2 bg-green-600 text-white cursor-pointer shadow hover:shadow-lg hover:bg-green-500" disabled={loading}>
                        {loading ? "Processing..." : "Proceed to Payment"}<IoCardSharp size={22}/>
                    </button>
                </div>

            </div>
            )}

            {/* CANCELLED */}
            {booking.status === "cancelled" && (
                <div>
                    <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm bg-red-50 text-red-500 hover:bg-red-100 transition"
                    onClick={() => onDelete(booking.id)}>
                        <IoTrash/>Remove
                    </button>
                </div>
            )}
        </div>
    )
}

export default Actions;