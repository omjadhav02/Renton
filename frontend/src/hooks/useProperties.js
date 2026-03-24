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

    const handleSearch = async (query) => {
        try {
            setLoading(true);
            setError(null);

            const data = await searchProperties(query);
            setProperties(data)

        } catch (error) {
            setError(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() =>{
        fetchAll();
    },[]);

    return { properties, loading, handleSearch, error};
}