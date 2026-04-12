import PropertyHeader from "../components/PropertyDetails/PropertyHeader";
import PropertyGallery from "../components/PropertyDetails/PropertyGallery";
import PropertyInfo from "../components/PropertyDetails/PropertyInfo";
import BookingCard from "../components/PropertyDetails/BookingCard";
import ImageModal from "../components/PropertyDetails/ImageModal";
import ReviewsSection from "../components/Reviews/ReviewsSection";
import { usePropertyDetails } from "../hooks/usePropertyDetails";
import { useProperties } from "../hooks/useProperties";
import MapView from "../features/map/components/MapView";

function PropertyDetails() {
    const {
        property,
        images,
        currentImage,
        setCurrentImage,
        showModal,
        setShowModal
    } = usePropertyDetails();
    const { properties } = useProperties();

    if (!property) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">Loading property...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 bg-gray-50 min-h-screen">

            <PropertyHeader property={property} />

            <PropertyGallery
                images={images}
                currentImage={currentImage}
                setCurrentImage={setCurrentImage}
                setShowModal={setShowModal}
            />

            <div className="grid lg:grid-cols-3 gap-10 mt-10 items-start">

                <div className="lg:col-span-2">
                    <PropertyInfo property={property} />
                </div>

                <BookingCard
                    propertyId={property.id}
                    price={property.price}
                />

            </div>

            {showModal && (
                <ImageModal
                    images={images}
                    currentImage={currentImage}
                    setCurrentImage={setCurrentImage}
                    setShowModal={setShowModal}
                />
            )}

            <div>
                <MapView properties={properties} />
            </div>

            <div className="mt-12">
                <ReviewsSection propertyId={property.id} />
            </div>
        </div>
    );
}

export default PropertyDetails;