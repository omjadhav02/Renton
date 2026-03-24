import { useEffect, useState } from "react"
import { getOwnerBookings, updateBookingStatus } from "../services/bookingService";
import toast from "react-hot-toast";

export const useRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchBookingRequests = async () => {
        try {
            setLoading(true);
            const data = await getOwnerBookings();

            setRequests(data);

        } catch (error) {
            toast.error(error);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const updateStatus = async (id, status) => {
        try {
            await updateBookingStatus(id, status);
            toast.success(`Booking${status}`);
            fetchBookingRequests();

        } catch (error) {
            toast.error("Failed to update status");
        }
    }

    useEffect(() => {
        fetchBookingRequests();
    },[])

    return {requests, loading, updateStatus};
}
