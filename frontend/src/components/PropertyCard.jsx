import { IoHeart, IoHeartOutline, IoOpenOutline } from "react-icons/io5";
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
      onClick={() => navigate(`/property/${property.id}`)}
      className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer group"
    >

      {/* IMAGE */}
      <div className="relative overflow-hidden">

        <img
          src={
            property.images?.[0]?.imageUrl ||
            "https://via.placeholder.com/400"
          }
          alt={property.title}
          className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
        />

        {/* FAV BUTTON */}
        <button
          className="absolute top-3 right-3 p-2 bg-white border border-slate-200 rounded-full shadow-sm hover:scale-110 transition"
          onClick={handleFav}
        >
          {isFav ? (
            <IoHeart className="text-red-500" />
          ) : (
            <IoHeartOutline className="text-slate-600" />
          )}
        </button>

        {/* PRICE BADGE */}
        <div className="absolute bottom-3 left-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow">
          ₹ {property.price}/month
        </div>

      </div>

      {/* INFO */}
      <div className="p-4">

        <h3 className="font-semibold text-lg text-slate-900 line-clamp-1">
          {property.title}
        </h3>

        <p className="text-slate-500 text-sm">
          {property.city}
        </p>

        <div className="flex justify-between items-center mt-3 text-sm text-slate-500">

          <span>{property.bedrooms} Beds</span>
          <span>{property.bathrooms} Baths</span>

          <span
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/property/${property.id}`);
            }}
            className="text-indigo-600 hover:text-indigo-700"
          >
            <IoOpenOutline size={20} />
          </span>

        </div>

      </div>

    </div>
  );
}

export default PropertyCard;