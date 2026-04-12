import RequestList from "../../components/BookingRequests/RequestList";
import ChatDrawer from "../../features/chat/components/ChatDrawer";
import { useChat } from "../../features/chat/hooks/useChat";
import { useRequests } from "../../hooks/useRequests";

const Requests = () => {
  const { requests, loading, updateStatus, deleteRequest } = useRequests();
  const { openChat, isOpen, chatUser, closeChat } = useChat();

  return (
    <div className="w-full mx-auto px-6 py-10 min-h-screen bg-slate-950">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-white">
          Booking Requests
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Manage and respond to tenant requests
        </p>
      </div>

      {/* LIST */}
      {loading ? (
        <p className="text-center text-slate-400">Loading...</p>
      ) : (
        <RequestList
          requests={requests}
          onApprove={(id) => updateStatus(id, "approved")}
          onReject={(id) => updateStatus(id, "cancelled")}
          onChat={openChat}
          onDelete={deleteRequest}
        />
      )}

      <ChatDrawer
        isOpen={isOpen}
        user={chatUser}
        onClose={closeChat}
      />

    </div>
  );
};

export default Requests;