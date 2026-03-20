import { useNavigate } from "react-router-dom";

function OwnerPropertyCard({ property }) {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/owner/edit-property/${property.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
    >

      {/* Image */}
      <img
        src={
          property.images?.[0]?.imageUrl ||
          "https://via.placeholder.com/400"
        }
        alt={property.title}
        className="w-full h-48 object-cover"
      />

      {/* Info */}
      <div className="p-4">

        <h2 className="font-semibold text-lg">
          {property.title}
        </h2>

        <p className="text-gray-500 text-sm">
          {property.city}
        </p>

        <p className="text-gray-900 font-semibold mt-2">
          ₹ {property.price}
            <span className="text-gray-500 text-sm ml-1">
                /month
            </span>
        </p>
        <p className="text-sm text-gray-500 mt-1">
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