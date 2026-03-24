import BookingCard from "./BookingCard";


const BookingList = ({bookings, onChat}) => {
    if(bookings.length === 0){
        return (
            <p className="text-gray-500">
                No Bookings Yet!
            </p>
        );
    }

    return (
        <div>
            {bookings.map((booking) => (
                <BookingCard
                    key={booking.id}
                    booking={booking}
                    onChat={onChat}
                />
            ))}
        </div>
    )
}

export default BookingList;