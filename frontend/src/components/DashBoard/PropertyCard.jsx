import React from "react";
import { IoOpenOutline, IoPencilOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
      
      {/* Image */}
      <img
        src={
          property.images?.[0]?.imageUrl ||
          "https://via.placeholder.com/300"
        }
        alt={property.title}
        className="w-full h-40 object-cover"
      />

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg truncate">
          {property.title}
        </h3>

        <p className="text-sm text-gray-500">
          {property.city}
        </p>

        <p className="mt-2 font-medium">
          ₹{property.price}
        </p>

        {/* Actions */}
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => navigate(`/property/${property.id}`)}
            className="text-sm text-blue-500 hover:underline"
          >
            <IoOpenOutline size={26}/>
          </button>

          <button
            onClick={() => navigate(`/owner/edit-property/${property.id}`)}
            className="text-sm text-green-500 hover:underline"
          >
            <IoPencilOutline size={26}/>
          </button>
        </div>
      </div>

    </div>
  );
};

export default PropertyCard;