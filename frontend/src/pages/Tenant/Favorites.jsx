import { useNavigate } from "react-router-dom";
import { useFavorites } from "../../hooks/useFavorites";
import { IoHeart } from "react-icons/io5";

function Favorites() {
  const navigate = useNavigate();
  const { favorites, removeFav } = useFavorites();

  const handleRemove = (e, propertyId) => {
    e.stopPropagation();
    removeFav(propertyId);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Favorites</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          No favorites yet ❤️
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((fav) => (
            <div
              key={fav.id}
              onClick={() => navigate(`/property/${fav.property.id}`)}
              className="cursor-pointer group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={
                    fav.property.images?.[0]?.imageUrl ||
                    "https://placehold.co/400x300"
                  }
                  onError={(e) => {
                    e.target.src = "https://placehold.co/400x300";
                  }}
                  alt={fav.property.title}
                  className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
                />

                {/* ❤️ Remove Favorite */}
                <button
                  onClick={(e) => handleRemove(e, fav.property.id)}
                  className="absolute top-3 right-3 p-2 bg-white/80 rounded-full backdrop-blur-md shadow hover:scale-110 transition"
                >
                  <IoHeart className="text-red-500" />
                </button>

                {/* Price */}
                <div className="absolute bottom-3 left-3 bg-white px-3 py-1 rounded-full text-sm font-semibold shadow">
                  ₹ {fav.property.price}/month
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">
                  {fav.property.title}
                </h3>

                <p className="text-gray-500 text-sm">
                  {fav.property.city}
                </p>

                <div className="flex justify-between mt-3 text-sm text-gray-600">
                  <span>{fav.property.bedrooms} Beds</span>
                  <span>{fav.property.bathrooms} Baths</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;