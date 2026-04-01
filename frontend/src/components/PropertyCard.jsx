import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function PropertyCard({ property, Fav }) {

  const navigate = useNavigate();  
  
  const isFav = Fav.favIds.includes(property.id)

  const handleFav = (e) => {
      e.stopPropagation();

      if(isFav){
        Fav.removeFav(property.id)
      } else{
        Fav.addFav(property.id);
      }
      
  }

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

        <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full backdrop-blur-md shadow hover:scale-110 transition" onClick={handleFav}>
          {isFav ? (
            <IoHeart className="text-red-500"/>
          ): (
            <IoHeartOutline/>
          )}
          
        </button>

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