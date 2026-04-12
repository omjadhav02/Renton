import { useEffect, useState } from "react"
import { getAllProperties } from "../../../services/propertyService";

export const useMapProperties = () => {
    const [properties, setProperties] = useState([]);
    try {
        

        const fetchProperties = async () => {
            const data = await getAllProperties();

            setProperties(data);
        }
        useEffect(() => {
            fetchProperties();
        })
    } catch (error) {
        console.error(error);
    }
    
    return {properties}
}