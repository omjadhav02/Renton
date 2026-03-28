import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"
import { createBooking, getMyBookings } from "../services/bookingService";

export const useBookingCard = ({propertyId, price}) => {
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
    const total = price && months ? price * months : 0;

    // 🔍 Check if already booked
    useEffect(() => {
        if (!user) return;

        const checkBooking = async () => {
            try {
                const data = await getMyBookings();
                const found = data.find(
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

            const data = await createBooking(propertyId, startDate, endDate)

            setExistingBooking(data);

            toast.success("Booking request sent!");

        } catch (err) {
            toast.error(err.response?.data?.message || "Booking failed");
        } finally {
            setLoading(false);
        }
    };

    return { startDate, setStartDate, setMonths, months, loading, setLoading, existingBooking, setExistingBooking, getButtonText, handleBooking, total, endDate }
}