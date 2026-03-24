import RequestList from "../components/BookingRequests/RequestList";
import ChatDrawer from "../features/chat/components/ChatDrawer";
import { useChat } from "../features/chat/hooks/useChat";
import { useRequests } from "../hooks/useRequests"

const OwnerBookings = () => {
    const {requests, loading, updateStatus} = useRequests();

    const { openChat, isOpen, chatUser, closeChat } = useChat();

    return (
     
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold">Booking Requests</h1>
          <p className="text-gray-500 text-sm">Manage and respond to tenant requests</p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <RequestList requests={requests} onApprove={(id) => updateStatus(id, "approved")
          }
          onReject={(id) => updateStatus(id, "cancelled")}
          onChat={openChat}/>
        )}

        <ChatDrawer
          isOpen={isOpen}
          user={chatUser}
          onClose={closeChat}
        />

      </div>
    )
}

export default OwnerBookings;