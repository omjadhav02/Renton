import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";

function OwnerBookings() {

  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {

    try {

      const res = await axiosInstance.get("/bookings/owner");

      setBookings(res.data);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {

    try {

      await axiosInstance.put(`/bookings/${id}`, {
        status
      });

      fetchBookings();

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6">
        Booking Requests
      </h1>

      {bookings.map((booking) => (

        <div
          key={booking.id}
          className="border p-4 rounded mb-4"
        >

          <h2 className="font-semibold">
            {booking.property.title}
          </h2>

          <p>Tenant: {booking.tenant.name}</p>

          <p>
            {new Date(booking.startDate).toLocaleDateString()}
            {" - "}
            {new Date(booking.endDate).toLocaleDateString()}
          </p>

          <p>Status: {booking.status}</p>

          {booking.status === "pending" && (

            <div className="flex gap-2 mt-3">

              <button
                onClick={() => updateStatus(booking.id, "approved")}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Approve
              </button>

              <button
                onClick={() => updateStatus(booking.id, "cancelled")}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Reject
              </button>

            </div>

          )}

        </div>

      ))}

    </div>

  );

}

export default OwnerBookings;