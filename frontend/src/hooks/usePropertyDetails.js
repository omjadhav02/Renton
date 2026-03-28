import { useEffect, useState } from "react";
import { getPropertyById } from "../services/propertyService"
import { useParams } from "react-router-dom";


export const usePropertyDetails = () => {
    const { id } = useParams();
    
    const [property, setProperty] = useState(null);
    const [currentImage, setCurrentImage] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const fetchProperty = async () => {
        try {
            const data = await getPropertyById(id);

            setProperty(data);
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        if(!id){
            return;
        }
        fetchProperty();
    },[id])

    const images = property?.images?.length
        ? property.images.map(img => img.imageUrl)
        : ["https://via.placeholder.com/900x500?text=No+Image"];

    return { property, images, currentImage, setCurrentImage, showModal, setShowModal }
}