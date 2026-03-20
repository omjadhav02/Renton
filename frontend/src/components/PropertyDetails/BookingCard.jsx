import { useState, useEffect } from "react";
import axiosInstance from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function BookingCard({ propertyId, price }) {

    const { user } = useAuth();

    const [startDate, setStartDate] = useState("");
    const [months, setMonths] = useState(1);
    const [loading, setLoading] = useState(false);
    const [existingBooking, setExistingBooking] = useState(null);
    const navigate = useNavigate();

    // 📅 Calculate end date
    const calculateEndDate = () => {
        if (!startDate) return null;

        const start = new Date(startDate);
        start.setMonth(start.getMonth() + months);
        return start;
    };

    const endDate = calculateEndDate();
    const total = price * months;

    // 🔍 Check if already booked
    useEffect(() => {
        if (!user) return;

        const checkBooking = async () => {
            try {
                const res = await axiosInstance.get("/bookings/my");

                const found = res.data.find(
                    (b) => b.propertyId === propertyId
                );

                if (found) setExistingBooking(found);

            } catch (err) {
                console.error(err);
            }
        };

        checkBooking();
    }, [propertyId, user]);

    // 🎯 Button logic
    const getButtonText = () => {
        if (!existingBooking) return "Request Rental";

        if (existingBooking.status === "pending")
            return "Pending Approval";

        if (existingBooking.status === "approved")
            return "Booked";

        if (existingBooking.status === "rejected")
            return "Request Again";

        return "Request Rental";
    };

    const isDisabled =
        existingBooking &&
        (existingBooking.status === "pending" ||
         existingBooking.status === "approved");

    // 🚀 Booking handler
    const handleBooking = async () => {
        if (!user) {
            toast.error("You must login first!");
            navigate("/login")
            return;
        }

        if (!startDate) {
            toast.error("Select start date");
            return;
        }

        try {
            setLoading(true);

            const res = await axiosInstance.post("/bookings", {
                propertyId,
                startDate,
                endDate
            });

            setExistingBooking(res.data);

            toast.success("Booking request sent!");

        } catch (err) {
            toast.error(err.response?.data?.message || "Booking failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-lg p-6 sticky top-24">

            <h2 className="text-xl font-semibold mb-4">
                Rent this property
            </h2>

            <p className="text-lg font-semibold mb-4">
                ₹{price} <span className="text-gray-500 text-sm">/month</span>
            </p>

            {/* STATUS MESSAGE */}
            {existingBooking && (
                <p className="text-sm text-center mb-3 text-gray-600">
                    {existingBooking.status === "pending" && "Your request is under review"}
                    {existingBooking.status === "approved" && "This property is booked by you"}
                    {existingBooking.status === "rejected" && "Your request was rejected"}
                </p>
            )}

            {/* START DATE */}
            <div className="mb-4">
                <label className="text-sm text-gray-600">Start Date</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full border rounded-xl p-2 mt-1"
                />
            </div>

            {/* MONTH SELECT */}
            <div className="mb-4">
                <label className="text-sm text-gray-600">Duration</label>
                <select
                    value={months}
                    onChange={(e) => setMonths(Number(e.target.value))}
                    className="w-full border rounded-xl p-2 mt-1"
                >
                    {[1,2,3,6,12].map(m => (
                        <option key={m} value={m}>
                            {m} month{m > 1 && "s"}
                        </option>
                    ))}
                </select>
            </div>

            {/* SUMMARY */}
            {startDate && (
                <div className="text-sm text-gray-600 mb-4 space-y-1">

                    <div className="flex justify-between">
                        <span>Start</span>
                        <span>{new Date(startDate).toLocaleDateString()}</span>
                    </div>

                    {endDate && (
                        <div className="flex justify-between">
                            <span>End</span>
                            <span>{endDate.toLocaleDateString()}</span>
                        </div>
                    )}

                    <div className="flex justify-between font-semibold border-t pt-2 text-gray-800">
                        <span>Total</span>
                        <span>₹{total}</span>
                    </div>

                </div>
            )}

            {/* BUTTON */}
            <button
                onClick={handleBooking}
                disabled={isDisabled || loading}
                className={`w-full py-3 rounded-xl transition
                    ${isDisabled
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-black text-white hover:opacity-90"}
                `}
            >
                {loading ? "Processing..." : getButtonText()}
            </button>

            <p className="text-xs text-gray-500 mt-3 text-center">
                Owner will approve based on availability
            </p>

        </div>
    );
}

export default BookingCard;