import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyProperties } from "../services/propertyService";


export const useMyProperties = () => {
    const { user } = useAuth();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProperties = async () => {
        setLoading(true);
        try {
            const data = await getMyProperties();

            const myProperties = data.filter(
            (p) => p.ownerId === user.id
            );

            setProperties(myProperties);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
        };

        fetchProperties();
    }, [user]);

    return { user, properties, loading }
}