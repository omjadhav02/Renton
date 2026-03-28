import RequestList from "../../components/BookingRequests/RequestList";
import ChatDrawer from "../../features/chat/components/ChatDrawer";
import { useChat } from "../../features/chat/hooks/useChat";
import { useRequests } from "../../hooks/useRequests";

const Requests = () => {
  const { requests, loading, updateStatus, deleteRequest } = useRequests();
  const { openChat, isOpen, chatUser, closeChat } = useChat();

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-gray-900">
          Booking Requests
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage and respond to tenant requests
        </p>
      </div>

      {/* LIST */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <RequestList
          requests={requests}
          onApprove={(id) => updateStatus(id, "approved")}
          onReject={(id) => updateStatus(id, "cancelled")}
          onChat={openChat}
          onDelete={deleteRequest}
        />
      )}

      {/* CHAT */}
      <ChatDrawer
        isOpen={isOpen}
        user={chatUser}
        onClose={closeChat}
      />

    </div>
  );
};

export default Requests;