import {
  IoCallOutline,
  IoChatbubbleEllipsesOutline,
  IoCheckmark,
  IoClose,
  IoMailOutline,
  IoSend,
  IoTrash
} from "react-icons/io5";

const Actions = ({ info }) => {

  const { request, tenant, onApprove, onReject, onChat, onDelete } = info;

  return (
    <div className="mt-4 space-y-4">

  {/* PENDING */}
  {request.status === "pending" && (
    <div className="flex gap-3">
      <button
        onClick={() => onApprove(request.id)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition"
      >
        <IoCheckmark />
        Approve
      </button>

      <button
        onClick={() => onReject(request.id)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-slate-800 border border-slate-700 text-white hover:border-red-500 transition"
      >
        <IoClose />
        Reject
      </button>
    </div>
  )}

  {/* APPROVED */}
  {request.status === "approved" && tenant && (
    <div className="p-5 rounded-2xl bg-slate-800 border border-slate-700 space-y-5">

      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
          <IoChatbubbleEllipsesOutline />
        </div>
        <h3 className="text-sm font-semibold text-white">
          Communication Hub
        </h3>
      </div>

      {/* CONTACT */}
      <div>
        <p className="text-xs text-slate-400 mb-2 font-medium">Contact</p>

        <div className="flex flex-wrap gap-3">

          {tenant.phone && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white">
              <IoCallOutline className="text-emerald-400" />
              {tenant.phone}
            </div>
          )}

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white">
            <IoMailOutline className="text-blue-400" />
            {tenant.email}
          </div>

        </div>
      </div>

      {/* CHAT */}
      <button
        onClick={() => onChat(tenant)}
        className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition"
      >
        <IoChatbubbleEllipsesOutline />
        Chat
      </button>

    </div>
  )}

  {/* CANCELLED */}
  {request.status === "cancelled" && (
    <button
      onClick={() => onDelete(request.id)}
      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
    >
      <IoTrash />
      Remove
    </button>
  )}

</div>
  );
};

export default Actions;