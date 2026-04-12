import { IoChatbubbleEllipses, IoCheckmark, IoTrashBinSharp } from "react-icons/io5";
import { useRequests } from "../../hooks/useRequests";
import { MdCancel } from "react-icons/md";

const RequestsTable = ({ requests, setRequests, onChat }) => {

  const { updateStatus } = useRequests();

  const handleStatusUpdate = async (id, status) => {
    try {

      await updateStatus(id, status);

      setRequests((prev) =>
        prev.map((req) =>
          req.id === id ? { ...req, status } : req
        )
      );

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

  <h2 className="text-lg font-semibold text-white mb-4">
    Recent Requests
  </h2>

  {requests.length === 0 ? (
    <p className="text-slate-400">No requests found</p>
  ) : (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-slate-300">

        <thead className="border-b border-slate-800 text-slate-400">
          <tr>
            <th className="py-2">Property</th>
            <th className="py-2">Tenant</th>
            <th className="py-2">Dates</th>
            <th className="py-2">Status</th>
            <th className="py-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((req) => (
            <tr key={req.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition">

              <td className="py-3">{req.property?.title}</td>
              <td className="py-3">{req.tenant?.name}</td>

              <td className="py-3">
                {new Date(req.startDate).toLocaleDateString()} -{" "}
                {new Date(req.endDate).toLocaleDateString()}
              </td>

              <td className="py-3 capitalize">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    req.status === "approved"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : req.status === "pending"
                      ? "bg-yellow-500/10 text-yellow-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {req.status}
                </span>
              </td>

              <td className="py-3">
                {req.status === "pending" && (
                  <div className="flex gap-2">

                    <button
                      onClick={() => handleStatusUpdate(req.id, "approved")}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-sm hover:bg-emerald-700 transition"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleStatusUpdate(req.id, "cancelled")}
                      className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700 transition"
                    >
                      Reject
                    </button>

                  </div>
                )}

                {req.status === "approved" && (
                  <button
                    onClick={() => onChat(req.tenant)}
                    className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white hover:border-emerald-500 transition"
                  >
                    Chat
                  </button>
                )}
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )}
</div>
  );
};

export default RequestsTable;