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


export const pollPayment = async (paymentId) => {
    for (let i=0; i<10; i++){
        const res = await axiosInstance.get(`/payments/${paymentId}`);

        if(res.data.razorpayOrderId){
            return res.data;
        }

        await new Promise(r => setTimeout(r,1000));
    }

    throw new Error("Order creation timeout");
}

export const paymentStatus = async (bookingId) => {
    const res = await axiosInstance.get(`/payments/status/${bookingId}`);
    
    return res.data;
}