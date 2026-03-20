import { useParams } from "react-router-dom";
import axiosInstance from "../api/axios";
import { useEffect, useState } from "react";

import PropertyHeader from "../components/PropertyDetails/PropertyHeader";
import PropertyGallery from "../components/PropertyDetails/PropertyGallery";
import PropertyInfo from "../components/PropertyDetails/PropertyInfo";
import BookingCard from "../components/PropertyDetails/BookingCard";
import ImageModal from "../components/PropertyDetails/ImageModal";
import ReviewsSection from "../components/Reviews/ReviewsSection";

function PropertyDetails() {
    const { id } = useParams();

    const [property, setProperty] = useState(null);
    const [currentImage, setCurrentImage] = useState(0);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const res = await axiosInstance.get(`/properties/${id}`);
                setProperty(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProperty();
    }, [id]);

    if (!property) return <p className="p-6">Loading...</p>;

    const images = property.images?.length
        ? property.images.map(img => img.imageUrl)
        : ["https://via.placeholder.com/900x500?text=No+Image"];

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">

            <PropertyHeader property={property} />

            <PropertyGallery
                images={images}
                currentImage={currentImage}
                setCurrentImage={setCurrentImage}
                setShowModal={setShowModal}
            />

            <div className="grid lg:grid-cols-3 gap-12 mt-10">

                <PropertyInfo property={property} />

                <BookingCard propertyId={property.id} price={property.price} />

            </div>

            {showModal && (
                <ImageModal
                    images={images}
                    currentImage={currentImage}
                    setCurrentImage={setCurrentImage}
                    setShowModal={setShowModal}
                />
            )}

            <ReviewsSection propertyId={property.id} />
        </div>
    );
}

export default PropertyDetails;