import {
  IoCalendarOutline,
  IoCheckmarkCircleOutline,
  IoTimeOutline,
  IoCloseCircleOutline
} from "react-icons/io5";
import PropertyInfo from "./PropertyInfo";
import Actions from "./Actions";

const RequestCard = ({ request, onApprove, onReject, onChat, onDelete }) => {

  const image =
    request.property?.images?.[0]?.imageUrl ||
    "https://via.placeholder.com/300";

  const tenant = request.tenant;
  const property = request.property;

  const info = { request, onApprove, onChat, onReject, tenant, onDelete };

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

  const status = getStatusConfig(request.status);

  return (
    <div className="flex gap-5 bg-slate-900 border border-slate-800 p-5 rounded-2xl hover:border-emerald-500/30 transition">

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
        <h2 className="text-lg font-semibold text-white">
          {property.title}
        </h2>

        <p className="text-slate-400 text-sm mt-1">
          Tenant: <span className="text-white font-medium">{tenant.name}</span>
        </p>
      </div>

      <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${status.style}`}>
        {status.icon}
        {request.status}
      </span>

    </div>

    {/* DATES */}
    <div className="text-sm text-slate-400 flex items-center gap-2">
      <IoCalendarOutline size={16} />
      {new Date(request.startDate).toLocaleDateString()} →
      {new Date(request.endDate).toLocaleDateString()}
    </div>

    {/* INFO */}
    <PropertyInfo property={property} />

    {/* ACTIONS */}
    <Actions info={info} />

  </div>

</div>
  );
};

export default RequestCard;