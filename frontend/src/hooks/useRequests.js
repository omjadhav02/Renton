import { useEffect, useState } from "react"
import { updateBookingStatus, getBookingRequests, deleteBookingRequest } from "../services/bookingService";
import toast from "react-hot-toast";

export const useRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchBookingRequests = async () => {
        try {
            setLoading(true);
            const data = await getBookingRequests();

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

    const deleteRequest = async (id) => {
        try {
            await deleteBookingRequest(id);
            toast.success(`Booking Request Removed!`)
            fetchBookingRequests();
        } catch (error) {
            toast.error("Failed to remove!")
        }
    }

    useEffect(() => {
        fetchBookingRequests();
    },[])

    return { requests, loading, updateStatus, deleteRequest };
}
