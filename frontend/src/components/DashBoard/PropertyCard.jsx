import React from "react";
import { IoOpenOutline, IoPencilOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  return (
<div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition group">

  <img
    src={property.images?.[0]?.imageUrl || "https://via.placeholder.com/300"}
    alt={property.title}
    className="w-full h-40 object-cover group-hover:scale-105 transition"
  />

  <div className="p-4">

    <h3 className="font-semibold text-slate-900 text-lg truncate">
      {property.title}
    </h3>

    <p className="text-sm text-slate-500">
      {property.city}
    </p>

    <p className="mt-2 font-semibold text-indigo-600">
      ₹{property.price}
    </p>

    <div className="mt-4 flex justify-between">

      <button
        onClick={() => navigate(`/property/${property.id}`)}
        className="text-slate-500 hover:text-indigo-600"
      >
        <IoOpenOutline size={22}/>
      </button>

      <button
        onClick={() => navigate(`/owner/edit-property/${property.id}`)}
        className="text-slate-500 hover:text-indigo-600"
      >
        <IoPencilOutline size={22}/>
      </button>

    </div>

  </div>

</div>
  );
};

export default PropertyCard;