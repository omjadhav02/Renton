import BookingCard from "./BookingCard";


const BookingList = ({bookings, onChat, onDelete}) => {
    if(bookings.length === 0){
        return (
            <div className="mt-10 p-10 text-center rounded-3xl bg-white/70 backdrop-blur-xl border border-white/40">
            <p className="text-gray-500">
                No Bookings Yet!
            </p>
            </div>
        );
    }

    return (
        <div className="grid gap-5">
            {bookings.map((booking) => (
                <BookingCard
                    key={booking.id}
                    booking={booking}
                    onChat={onChat}
                    onDelete={onDelete}
                />
            ))}
        </div>
    )
}

export default BookingList;