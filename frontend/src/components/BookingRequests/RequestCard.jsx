import {
  IoCheckmark,
  IoClose,
  IoCallOutline,
  IoMailOutline,
  IoChatbubbleEllipsesOutline,
  IoCalendarOutline,
} from "react-icons/io5";

const RequestCard = ({ request, onApprove, onReject, onChat }) => {

  const image =
    request.property?.images?.[0]?.imageUrl ||
    "https://via.placeholder.com/300";

  const tenant = request.tenant;

  const getStatusStyle = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="flex gap-5 bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition">

      {/* IMAGE */}
      <img
        src={image}
        alt="property"
        className="w-32 h-24 object-cover rounded-xl"
      />

      {/* CONTENT */}
      <div className="flex-1">

        {/* TOP */}
        <div className="flex justify-between items-start">

          <div>
            <h2 className="text-lg font-semibold">
              {request.property.title}
            </h2>

            <p className="text-gray-500 text-sm">
              Tenant: {tenant.name}
            </p>
          </div>

          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(request.status)}`}>
            {request.status}
          </span>

        </div>

        {/* DATES */}
        <div className="mt-3 text-sm text-gray-600 flex items-center gap-2">
          <IoCalendarOutline size={16} />
          {new Date(request.startDate).toLocaleDateString()}
          {" → "}
          {new Date(request.endDate).toLocaleDateString()}
        </div>

        {/* ACTIONS */}
        <div className="mt-4 flex flex-wrap gap-3">

          {/* PENDING ACTIONS */}
          {request.status === "pending" && (
            <>
              <button
                onClick={() => onApprove(request.id)}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-sm"
              >
                <IoCheckmark />
                Approve
              </button>

              <button
                onClick={() => onReject(request.id)}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm"
              >
                <IoClose />
                Reject
              </button>
            </>
          )}

          {/* APPROVED ACTIONS (CONTACT TENANT) */}
          {request.status === "approved" && tenant && (
            <>
              {tenant.phone && (
                <a
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl text-sm hover:bg-gray-200 transition"
                >
                  <IoCallOutline size={16} />
                  {tenant.phone}
                </a>
              )}

              <a
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl text-sm hover:bg-gray-200 transition"
              >
                <IoMailOutline size={16} />
                {tenant.email}
              </a>

              <button
                onClick={() => onChat(tenant)}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl text-sm hover:opacity-90 transition"
              >
                <IoChatbubbleEllipsesOutline size={16} />
                Chat
              </button>
            </>
          )}

        </div>

      </div>
    </div>
  );
};

export default RequestCard;