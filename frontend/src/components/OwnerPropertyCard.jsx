import { useNavigate } from "react-router-dom";

function OwnerPropertyCard({ property }) {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/owner/edit-property/${property.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition group"
    >

      {/* Image */}
      <img
        src={
          property.images?.[0]?.imageUrl ||
          "https://via.placeholder.com/400"
        }
        alt={property.title}
        className="w-full h-48 object-cover group-hover:scale-105 transition"
      />

      {/* Info */}
      <div className="p-4">

        <h2 className="font-semibold text-lg text-white line-clamp-1">
          {property.title}
        </h2>

        <p className="text-slate-400 text-sm">
          {property.city}
        </p>

        <p className="text-emerald-400 font-semibold mt-2">
          ₹ {property.price}
          <span className="text-slate-400 text-sm ml-1">
            /month
          </span>
        </p>

        <p className="text-xs text-slate-500 mt-2">
          {new Date(property.createdAt).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          })}
        </p>

      </div>

    </div>
  );
}

export default OwnerPropertyCard;