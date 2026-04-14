import {
  IoCallOutline,
  IoChatbubbleEllipsesOutline,
  IoCheckmark,
  IoClose,
  IoMailOutline,
  IoTrash
} from "react-icons/io5";

const Actions = ({ info }) => {

  const { request, tenant, onApprove, onReject, onChat, onDelete } = info;

  return (
    <div className="mt-4 space-y-4">

      {request.status === "pending" && (
        <div className="flex gap-3">
          <button
            onClick={() => onApprove(request.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700"
          >
            <IoCheckmark />
            Approve
          </button>

          <button
            onClick={() => onReject(request.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            <IoClose />
            Reject
          </button>
        </div>
      )}

      {request.status === "approved" && tenant && (
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-5">

          <h3 className="text-sm font-semibold text-slate-900">
            Communication
          </h3>

          <div className="flex flex-wrap gap-3">

            {tenant.phone && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700">
                <IoCallOutline />
                {tenant.phone}
              </div>
            )}

            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700">
              <IoMailOutline />
              {tenant.email}
            </div>

          </div>

          <button
            onClick={() => onChat(tenant)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
          >
            <IoChatbubbleEllipsesOutline />
            Chat
          </button>

        </div>
      )}

      {request.status === "cancelled" && (
        <button
          onClick={() => onDelete(request.id)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm bg-red-50 text-red-600 hover:bg-red-100"
        >
          <IoTrash />
          Remove
        </button>
      )}

    </div>
  );
};

export default Actions;