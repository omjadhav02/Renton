import {
  IoCallOutline,
  IoMailOutline,
  IoChatbubbleEllipsesOutline,
  IoCalendarOutline,
} from "react-icons/io5";

const BookingCard = ({ booking, onChat }) => {

  const image =
    booking.property.images?.[0]?.imageUrl ||
    "https://via.placeholder.com/300";

  const owner = booking.property.owner;

  const getStatusStyle = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="flex gap-5 bg-white p-5 m-2 rounded-2xl shadow-sm border hover:shadow-md transition">

      {/* IMAGE */}
      <img
        src={image}
        className="w-32 h-24 object-cover rounded-xl"
      />

      {/* CONTENT */}
      <div className="flex-1">

        <div className="flex justify-between items-start">

          <div>
            <h2 className="text-lg font-semibold">
              {booking.property.title}
            </h2>

            <p className="text-gray-500 text-sm">
              {booking.property.city}
            </p>
          </div>

          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(booking.status)}`}>
            {booking.status}
          </span>

        </div>

        {/* DATES */}
        <div className="mt-3 text-sm text-gray-600">
          <IoCalendarOutline size={16}/> {new Date(booking.startDate).toLocaleDateString()}
          {" → "}
          {new Date(booking.endDate).toLocaleDateString()}
        </div>

        {/* ACTIONS */}
        {booking.status === "approved" && owner && (
          <div className="mt-4 flex gap-3 flex-wrap">

            {owner.phone && (
              <a
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl text-sm hover:bg-gray-200 transition"
              >
                <IoCallOutline size={16} />
                {owner.phone}
              </a>
            )}

            <a
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl text-sm hover:bg-gray-200 transition"
            >
              <IoMailOutline size={16} />
              {owner.email}
            </a>

            <button
              onClick={() => onChat(owner)}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl text-sm hover:opacity-90 transition"
            >
              <IoChatbubbleEllipsesOutline size={16} />
              Chat
            </button>

          </div>
        )}

      </div>
    </div>
  );
};

export default BookingCard;