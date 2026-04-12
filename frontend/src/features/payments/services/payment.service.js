import axiosInstance from "../../../api/axios"

export const getPayments = async () => {
    const res = await axiosInstance.get("/payments");

    return res.data;
}

export const createOrder = async ({bookingId}) => {
    const res = await axiosInstance.post("/payments",{bookingId});

    return res.data;
}

export const verifyPayments = async (payload) => {
    const res = await axiosInstance.post("/payments/verify-payment", payload);

    return res.data;
}