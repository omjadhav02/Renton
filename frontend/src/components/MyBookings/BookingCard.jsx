import {
  IoCallOutline,
  IoMailOutline,
  IoChatbubbleEllipsesOutline,
  IoCalendarOutline,
  IoTrash,
  IoCheckmarkCircleOutline,
  IoTimeOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";
import PropertyInfo from "./PropertyInfo";
import Actions from "./Actions";

const BookingCard = ({ booking, onChat, onDelete }) => {

  const image =
    booking.property.images?.[0]?.imageUrl ||
    "https://via.placeholder.com/300";

  const owner = booking.property.owner;
  
  const property = booking.property;

  const getStatusConfig = (status) => {
    switch (status) {
      case "approved":
        return {
            style: "bg-green-100 text-green-700",
            icon: <IoCheckmarkCircleOutline />
        };
      case "pending":
        return {
            style: "bg-yellow-100 text-yellow-700",
            icon: <IoTimeOutline />
        };
      case "cancelled":
        return {
            style: "bg-red-100 text-red-700",
            icon: <IoCloseCircleOutline />
        };
      default:
        return {
            style: "bg-gray-100 text-gray-600",
            icon: null
        };
    }
  };
  const status = getStatusConfig(booking.status);

  return (
    <div className="flex gap-5 backdrop-blur-xl bg-white/70 border border-white/40 p-5 rounded-3xl shadow-sm hover:shadow-md transition">

      {/* IMAGE */}
      <img
        src={image}
        alt="property"
        className="w-32 h-24 object-cover rounded-xl"
      />
      <div className="flex-1 space-y-4">

        {/* TOP */}
        <div className="flex justify-between items-start">

          <div> 
              <h2 className="text-lg font-semibold">
                {property.title}
              </h2>

              <p className="text-gray-500 text-sm mt-1">
              Owner: <span className="text-gray-700 font-medium">{owner.name}</span>
            </p>
          </div>

          <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${status.style}`}>
            {status.icon}
            {booking.status}
          </span>

        </div>

        {/* DATES */}
        <div className="text-sm text-gray-500 flex items-center gap-2">
          <IoCalendarOutline size={16}/> 
          {new Date(booking.startDate).toLocaleDateString()}
          {" → "}
          {new Date(booking.endDate).toLocaleDateString()}
        </div>

        {/* Property Info */}

        <PropertyInfo property={property}/>

        {/* ACTIONS */}
        <Actions booking={booking} owner={owner} onDelete={onDelete} onChat={onChat}/>

      </div>
    </div>
  );
};

export default BookingCard;