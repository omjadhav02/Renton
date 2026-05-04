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
<div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

  <h2 className="text-lg font-semibold text-slate-900 mb-4">
    Recent Requests
  </h2>

  {requests.length === 0 ? (
    <p className="text-slate-500">No requests found</p>
  ) : (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-slate-700">

        <thead className="border-b border-slate-200 text-slate-500">
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
            <tr key={req.id} className="border-b border-slate-100 hover:bg-slate-50">

              <td className="py-3">{req.property?.title}</td>
              <td className="py-3">{req.tenant?.name}</td>

              <td className="py-3">
                {new Date(req.startDate).toLocaleDateString()} -{" "}
                {new Date(req.endDate).toLocaleDateString()}
              </td>

              <td className="py-3">
                <span className={`px-2 py-1 rounded text-xs font-medium
                  ${req.status === "approved"
                    ? "bg-green-50 text-green-600"
                    : req.status === "pending"
                    ? "bg-yellow-50 text-yellow-600"
                    : "bg-red-50 text-red-600"
                  }`}>
                  {req.status}
                </span>
              </td>

              <td className="py-3">
                {req.status === "pending" && (
                  <div className="flex gap-2">

                    <button
                      onClick={() => handleStatusUpdate(req.id, "approved")}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleStatusUpdate(req.id, "cancelled")}
                      className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600"
                    >
                      Reject
                    </button>

                  </div>
                )}

                {req.status === "approved" && (
                  <button
                    onClick={() => onChat(req.tenant)}
                    className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50"
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