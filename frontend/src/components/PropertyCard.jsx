import { useNavigate } from "react-router-dom";

function PropertyCard({ property }) {

  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/property/${property.id}`)}
      className="cursor-pointer group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition"
    >

      {/* Image */}
      <div className="relative overflow-hidden">

        <img
          src={
            property.images?.[0]?.imageUrl ||
            "https://via.placeholder.com/400"
          }
          alt={property.title}
          className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
        />

        {/* Price Badge */}
        <div className="absolute bottom-3 left-3 bg-white px-3 py-1 rounded-full text-sm font-semibold shadow">
          ₹ {property.price}/month
        </div>

      </div>

      {/* Info */}
      <div className="p-4">

        <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">
          {property.title}
        </h3>

        <p className="text-gray-500 text-sm">
          {property.city}
        </p>

        {/* Extra Info */}
        <div className="flex justify-between items-center mt-3 text-sm text-gray-600">

          <span>{property.bedrooms} Beds</span>
          <span>{property.bathrooms} Baths</span>

        </div>

      </div>

    </div>
  );
}

export default PropertyCard;