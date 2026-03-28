import toast from "react-hot-toast";
import BookingList from "../../components/MyBookings/BookingList";
import ChatDrawer from "../../features/chat/components/ChatDrawer";
import { useChat } from "../../features/chat/hooks/useChat";
import { useBookings } from "../../hooks/useBookings";

function MyBookings() {
    const { bookings, loading, error, deleteBooking } = useBookings();
    const { openChat, isOpen, chatUser, closeChat } = useChat();

    if(error){   
        console.error(error)
        toast.error("Something Went wrong!")      
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-10 min-h-screen bg-gray-50">
            {/* HEADER */}
            <div className="mb-10">
                <h1 className="text-3xl font-semibold text-gray-900">
                My Bookings
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                Manage Your Bookings
                </p>
            </div>


            {/* LIST */}
            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : (
                <BookingList bookings={bookings} onChat={openChat} onDelete={deleteBooking}/>
            )}
            

            <ChatDrawer 
                isOpen={isOpen}
                user={chatUser}
                onClose={closeChat}
            />
        </div>
    )
}

export default MyBookings;