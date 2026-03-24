import axiosInstance from "../api/axios"

export const getMyBookings = async () => { 
    const res = await axiosInstance.get("/bookings/my");
    return res.data;
}

export const getOwnerBookings = async () => {
    const res = await axiosInstance.get("/bookings/owner");
    return res.data;
}

export const updateBookingStatus = async (id, status) => {
    const res = await axiosInstance.put(`/bookings/${id}`,{ status });
    return res.data;
}