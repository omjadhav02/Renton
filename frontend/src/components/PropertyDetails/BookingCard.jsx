import { useBookingCard } from "../../hooks/useBookingCard";

function BookingCard({ propertyId, price }) {

    const {
        startDate,
        setStartDate,
        setMonths,
        months,
        loading,
        existingBooking,
        getButtonText,
        handleBooking,
        total,
        endDate
    } = useBookingCard({ propertyId, price });

    const isDisabled =
        existingBooking &&
        (existingBooking.status === "pending" ||
         existingBooking.status === "approved");

    return (
        <div className="sticky top-24 backdrop-blur-xl bg-white/70 rounded-3xl shadow-xl p-6 space-y-6 border border-white/40">

            {/* PRICE */}
            <div>
                <p className="text-3xl font-bold text-gray-900">
                    ₹{price}
                    <span className="text-sm text-gray-500 font-normal"> /month</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                    Inclusive of all basic amenities
                </p>
            </div>

            {/* STATUS */}
            {existingBooking && (
                <p className="text-sm text-center text-gray-600 bg-gray-100 py-2 rounded-xl">
                    {existingBooking.status === "pending" && "⏳ Request under review"}
                    {existingBooking.status === "approved" && "✅ Already booked"}
                    {existingBooking.status === "rejected" && "❌ Request rejected"}
                </p>
            )}

            {/* INPUTS */}
            <div className="space-y-4">

                <div>
                    <label className="text-xs text-gray-500">Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full mt-1 p-3 rounded-xl bg-white/80 border border-gray-200 focus:ring-2 focus:ring-black outline-none"
                    />
                </div>

                <div>
                    <label className="text-xs text-gray-500">Duration</label>
                    <select
                        value={months}
                        onChange={(e) => setMonths(Number(e.target.value))}
                        className="w-full mt-1 p-3 rounded-xl bg-white/80 border border-gray-200 focus:ring-2 focus:ring-black outline-none"
                    >
                        {[1, 2, 3, 6, 12].map((m) => (
                            <option key={m} value={m}>
                                {m} month{m > 1 && "s"}
                            </option>
                        ))}
                    </select>
                </div>

            </div>

            {/* SUMMARY */}
            {startDate && (
                <div className="text-sm text-gray-600 space-y-2 bg-gray-50 p-4 rounded-xl">

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

                    <div className="flex justify-between font-semibold border-t pt-2 text-gray-900">
                        <span>Total</span>
                        <span>₹{total}</span>
                    </div>

                </div>
            )}

            {/* BUTTON */}
            <button
                onClick={handleBooking}
                disabled={isDisabled || loading}
                className={`w-full py-3 rounded-xl font-medium transition-all
                ${isDisabled
                    ? "bg-gray-200 text-gray-500"
                    : "bg-gradient-to-r from-black to-gray-800 text-white hover:scale-[1.02] active:scale-[0.98]"}
            `}
            >
                {loading ? "Processing..." : getButtonText()}
            </button>

            <p className="text-xs text-gray-400 text-center">
                Owner approval required
            </p>

        </div>
    );
}

export default BookingCard;