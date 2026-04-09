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
    <div className="bg-white shadow-md rounded-2xl p-5 mb-8">
      
      <h2 className="text-lg font-semibold mb-4">Recent Requests</h2>

      {requests.length === 0 ? (
        <p className="text-gray-500">No requests found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            
            <thead className="border-b">
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
                <tr key={req.id} className="border-b hover:bg-gray-50">

                  <td className="py-3">
                    {req.property?.title}
                  </td>

                  <td className="py-3">
                    {req.tenant?.name}
                  </td>

                  <td className="py-3">
                    {new Date(req.startDate).toLocaleDateString()} -{" "}
                    {new Date(req.endDate).toLocaleDateString()}
                  </td>

                  <td className="py-3 capitalize">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        req.status === "approved"
                          ? "bg-green-100 text-green-600"
                          : req.status === "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>

                  <td className="py-3 space-x-2">
                    {req.status === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleStatusUpdate(req.id, "approved")
                          }
                          className="flex items-center gap-2 p-2 rounded-xl bg-green-500 text-white font-medium hover:scale-[1.02] transition"
                        >
                          <IoCheckmark size={16}/>
                          Approve
                        </button>

                        <button
                          onClick={() =>
                            handleStatusUpdate(req.id, "cancelled")
                          }
                          className="flex items-center gap-2 p-2 rounded-xl bg-red-500  text-white font-medium hover:scale-[1.02] transition"
                        >
                          <MdCancel size={16}/>
                          Reject
                        </button>
                      </div>
                    )}
                    {req.status === "approved" && (
                      <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-black to-gray-800 text-white font-medium hover:scale-[1.02] transition" onClick={() => onChat(req.tenant)}>
                        <IoChatbubbleEllipses size={16}/>
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