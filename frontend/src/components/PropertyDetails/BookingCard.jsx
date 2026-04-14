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
        <div className="sticky top-24 bg-white rounded-2xl shadow-lg p-6 space-y-6 border border-slate-200">

            <div>
                <p className="text-3xl font-bold text-slate-900">
                    ₹{price}
                    <span className="text-sm text-slate-500 font-normal"> /month</span>
                </p>
            </div>

            {existingBooking && (
                <p className="text-sm text-center text-slate-600 bg-slate-100 py-2 rounded-xl">
                    {existingBooking.status === "pending" && "⏳ Request under review"}
                    {existingBooking.status === "approved" && "✅ Already booked"}
                    {existingBooking.status === "rejected" && "❌ Request rejected"}
                </p>
            )}

            <div className="space-y-4">

                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                />

                <select
                    value={months}
                    onChange={(e) => setMonths(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500"
                >
                    {[1, 2, 3, 6, 12].map((m) => (
                        <option key={m} value={m}>
                            {m} month{m > 1 && "s"}
                        </option>
                    ))}
                </select>

            </div>

            {startDate && (
                <div className="text-sm text-slate-600 space-y-2 bg-slate-50 p-4 rounded-xl">

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

                    <div className="flex justify-between font-semibold border-t pt-2 text-slate-900">
                        <span>Total</span>
                        <span>₹{total}</span>
                    </div>

                </div>
            )}

            <button
                onClick={handleBooking}
                disabled={isDisabled || loading}
                className={`w-full py-3 rounded-xl font-medium transition
                ${isDisabled
                    ? "bg-slate-200 text-slate-500"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"}
            `}
            >
                {loading ? "Processing..." : getButtonText()}
            </button>

            <p className="text-xs text-slate-400 text-center">
                Owner approval required
            </p>

        </div>
    );
}

export default BookingCard;