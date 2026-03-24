import BookingList from "../components/MyBookings/BookingList";
import ChatDrawer from "../features/chat/components/ChatDrawer";
import { useChat } from "../features/chat/hooks/useChat";
import { useBookings } from "../hooks/useBookings";

function MyBookings() {
    const { bookings, loading, error } = useBookings();
    const { openChat, isOpen, chatUser, closeChat } = useChat();

    if(loading) return <p className="flex justify-center p-5 ">Loading...</p>

    if(error){
        return (
            <p className="p-6 text-red-500">
                {error}
            </p>
        )
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-8">
                My Bookings
            </h1>

            <BookingList bookings={bookings} onChat={openChat}/>

            <ChatDrawer 
                isOpen={isOpen}
                user={chatUser}
                onClose={closeChat}
            />
        </div>
    )
}

export default MyBookings;