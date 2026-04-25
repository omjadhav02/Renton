import { useEffect, useState } from "react";
import { paymentStatus } from "../services/payment.service";

export const usePaymentStatus = ({booking}) => {

    const [payState, setPayState] = useState(null);

    const getPaymentStatus = async () => {
        try {
            const data = await paymentStatus(booking.id);
            setPayState(data?.status ?? null);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getPaymentStatus();
    },[payState]);

    return { payState }
}