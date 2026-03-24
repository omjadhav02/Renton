import { useEffect, useState } from "react"
import { getMyBookings } from "../services/bookingService";
import toast from "react-hot-toast"

export const useBookings = () => {
    const [bookings, setBookings] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getMyBookings();
            setBookings(data);

        } catch (error) {
            setError(error);
            toast.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBookings();
    },[]);

    return { bookings, loading, error};
}