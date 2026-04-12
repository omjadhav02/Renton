import { IoHeart, IoHeartOutline, IoMoveOutline, IoOpenOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function PropertyCard({ property, Fav }) {

  const navigate = useNavigate();
  const isFav = Fav.favIds.includes(property.id);

  const handleFav = (e) => {
    e.stopPropagation();

    if (isFav) {
      Fav.removeFav(property.id);
    } else {
      Fav.addFav(property.id);
    }
  };

  return (
    <div 
      
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

        {/* Fav */}
        <button
          className="absolute top-3 right-3 p-2 bg-slate-900/70 border border-slate-700 rounded-full backdrop-blur-md hover:scale-110 transition"
          onClick={handleFav}
        >
          {isFav ? (
            <IoHeart className="text-red-500"/>
          ) : (
            <IoHeartOutline className="text-white"/>
          )}
        </button>

        {/* Price */}
        <div className="absolute bottom-3 left-3 bg-emerald-500/90 text-white px-3 py-1 rounded-full text-sm font-medium shadow">
          ₹ {property.price}/month
        </div>

      </div>

      {/* Info */}
      <div className="p-4">

        <h3 className="font-semibold text-lg text-white line-clamp-1">
          {property.title}
        </h3>

        <p className="text-slate-400 text-sm">
          {property.city}
        </p>

        <div className="flex justify-between items-center mt-3 text-sm text-slate-400">
          <span>{property.bedrooms} Bedrooms</span>
          <span>{property.bathrooms} Bathrooms</span>
          <span onClick={() => navigate(`/property/${property.id}`)}
            className="cursor-pointer text-green-700 hover:text-green-600 "> <IoOpenOutline size={22}/></span>
        </div>

      </div>

    </div>
  );
}

export default PropertyCard;