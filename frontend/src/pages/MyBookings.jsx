import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";

function MyBookings() {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axiosInstance.get("/bookings/my");
                setBookings(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBookings();
    }, []);

    const getStatusStyle = (status) => {
        switch (status) {
            case "approved":
                return "bg-green-100 text-green-700";
            case "pending":
                return "bg-yellow-100 text-yellow-700";
            case "rejected":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">

            <h1 className="text-3xl font-semibold mb-8">
                My Bookings
            </h1>

            {bookings.length === 0 && (
                <p className="text-gray-500">No bookings yet.</p>
            )}

            <div className="space-y-6">

                {bookings.map((booking) => {

                    const image =
                        booking.property.images?.[0]?.imageUrl ||
                        "https://via.placeholder.com/300";

                    const owner = booking.property.owner;

                    return (
                        <div
                            key={booking.id}
                            className="flex gap-5 bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition"
                        >

                            {/* IMAGE */}
                            <img
                                src={image}
                                className="w-32 h-24 object-cover rounded-xl"
                            />

                            {/* CONTENT */}
                            <div className="flex-1">

                                <div className="flex justify-between items-start">

                                    <div>
                                        <h2 className="text-lg font-semibold">
                                            {booking.property.title}
                                        </h2>

                                        <p className="text-gray-500 text-sm">
                                            {booking.property.city}
                                        </p>
                                    </div>

                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(booking.status)}`}>
                                        {booking.status}
                                    </span>

                                </div>

                                {/* DATES */}
                                <div className="mt-3 text-sm text-gray-600">
                                    <p>
                                        📅 {new Date(booking.startDate).toLocaleDateString()} 
                                        {" → "}
                                        {new Date(booking.endDate).toLocaleDateString()}
                                    </p>
                                </div>

                                {/* 🔥 CONTACT SECTION (ONLY IF APPROVED) */}
                                {booking.status === "approved" && owner && (
                                    <div className="mt-4 flex gap-3 flex-wrap">

                                        {/* CALL */}
                                        {owner.phone && (
                                            <a
                                                href={`tel:${owner.phone}`}
                                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition text-sm"
                                            >
                                                📞 Call
                                            </a>
                                        )}

                                        {/* EMAIL */}
                                        <a
                                            href={`mailto:${owner.email}`}
                                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition text-sm"
                                        >
                                            ✉ Email
                                        </a>

                                        {/* CHAT (future) */}
                                        <button
                                            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl hover:opacity-90 text-sm"
                                            onClick={() => alert("Chat feature coming soon")}
                                        >
                                            💬 Chat
                                        </button>

                                    </div>
                                )}

                            </div>

                        </div>
                    );
                })}

            </div>

        </div>
    );
}

export default MyBookings;