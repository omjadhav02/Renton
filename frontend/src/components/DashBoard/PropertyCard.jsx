import React from "react";
import { IoOpenOutline, IoPencilOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition group">

  <img
    src={property.images?.[0]?.imageUrl || "https://via.placeholder.com/300"}
    alt={property.title}
    className="w-full h-40 object-cover group-hover:scale-105 transition"
  />

  <div className="p-4">

    <h3 className="font-semibold text-white text-lg truncate">
      {property.title}
    </h3>

    <p className="text-sm text-slate-400">
      {property.city}
    </p>

    <p className="mt-2 font-medium text-emerald-400">
      ₹{property.price}
    </p>

    <div className="mt-4 flex justify-between">

      <button
        onClick={() => navigate(`/property/${property.id}`)}
        className="text-slate-400 hover:text-emerald-400 transition"
      >
        <IoOpenOutline size={22}/>
      </button>

      <button
        onClick={() => navigate(`/owner/edit-property/${property.id}`)}
        className="text-slate-400 hover:text-emerald-400 transition"
      >
        <IoPencilOutline size={22}/>
      </button>

    </div>

  </div>

</div>
  );
};

export default PropertyCard;