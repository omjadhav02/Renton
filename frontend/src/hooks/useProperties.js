import { useEffect, useState } from "react"
import { getAllProperties, searchProperties } from "../services/propertyService";
import toast from "react-hot-toast"

export const useProperties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAll = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getAllProperties();
            setProperties(data);

        } catch (error) {
            setError(error);
            toast.error(error);
        } finally {
            setLoading(false)
        }
    }

     useEffect(() =>{
        fetchAll();
    },[]);

    const handleSearch = async (filters) => {
        try {
            setLoading(true);
            setError(null);

            
            const data = await searchProperties(filters);
            setProperties(data)

        } catch (error) {
            const msg =
                error.response?.data?.message ||
                error.message ||
                "Search failed";

            setError(msg);
        } finally {
            setLoading(false);
        }
    }  

    return { properties, loading, handleSearch, error};
}