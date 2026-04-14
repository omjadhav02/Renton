import { useNavigate, Link } from "react-router-dom";
import { IoPencilSharp } from "react-icons/io5";

function OwnerPropertyCard({ property }) {
  const navigate = useNavigate();

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/owner/edit-property/${property.id}`);
  };

  return (
    <Link
      to={`/property/${property.id}`}
      className="group block bg-white border border-gray-200 rounded-2xl overflow-hidden 
      shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      {/* IMAGE SECTION */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={
            property.images?.[0]?.imageUrl ||
            "https://via.placeholder.com/400"
          }
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* EDIT BUTTON */}
        <button
          onClick={handleEdit}
          className="absolute top-3 right-3 flex items-center justify-center
          w-9 h-9 rounded-xl 
          bg-white/90 backdrop-blur-md border border-gray-200
          shadow-sm hover:shadow-md
          transition-all duration-200
          hover:bg-indigo-50 hover:border-indigo-200
          group hover:cursor-auto"
        >
          <IoPencilSharp
            size={16}
            className="text-gray-600 group-hover:text-indigo-600 transition"
          />
        </button>

        {/* PRICE BADGE */}
        <div className="absolute bottom-3 left-3 bg-white px-3 py-1 rounded-lg shadow-sm text-sm font-semibold text-gray-800">
          ₹{property.price}
          <span className="text-gray-500 text-xs ml-1">/month</span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-1">
        <h2 className="font-semibold text-lg text-gray-800 line-clamp-1 group-hover:text-indigo-600 transition">
          {property.title}
        </h2>

        <p className="text-sm text-gray-500">
          📍 {property.city}
        </p>

        <p className="text-xs text-gray-400 pt-2">
          Added on{" "}
          {new Date(property.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
    </Link>
  );
}

export default OwnerPropertyCard;