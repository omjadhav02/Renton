import { useEffect } from "react";
import { useState } from "react"
import { getPayments } from "../services/payment.service";



export const usePayments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPayments = async () =>{
        const data = await getPayments();

        setPayments(data);
        setLoading(false);
    }
    
    useEffect(() => {
        fetchPayments();
    },[])

    return { payments, loading };
}