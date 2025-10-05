import  { useState, useEffect } from "react";
import Title from "../compontes/Title";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const { axios, getToken, user } = useAppContext();

  const fetchUserBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/user", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserBookings();
    }
  }, [user]);

  return (
    <div className="py-28 md:pb-36 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">
      {/* Page Title */}
      <Title
        title="My Bookings"
        subTitle="View and manage your hotel reservations. Track your check-in, check-out dates, and booking details here."
        align={"left"}
      />

      <div className="max-w-6xl mt-10 w-full text-gray-800 space-y-6">
        {bookings.length === 0 && (
          <div className="text-center text-gray-500 py-12">No bookings found.</div>
        )}
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md transition"
          >
            {/* Left: Hotel Info */}
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-2/3">
              <img
                src={booking.room?.images?.[0] || assets.roomImg1}
                alt="hotel"
                className="w-full md:w-40 h-32 object-cover rounded-lg shadow-sm"
              />
              <div className="flex flex-col gap-2">
                {/* Hotel Name */}
                <p className="font-playfair text-xl md:text-2xl text-gray-800">
                  {booking.hotel?.name || "Hotel"}{" "}
                  <span className="font-inter text-sm text-gray-500">
                    ({booking.room?.roomType || ""})
                  </span>
                </p>

                {/* Address */}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <img
                    src={assets.locationIcon}
                    alt="location"
                    className="w-4 h-4"
                  />
                  <span>{booking.hotel?.address || "-"}</span>
                </div>

                {/* Guests */}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <img
                    src={assets.guestsIcon}
                    alt="guests"
                    className="w-4 h-4"
                  />
                  <span>{booking.guests || 1} Guests</span>
                </div>

                {/* Price */}
                <p className="text-base font-medium text-gray-700">
                  Total:{" "}
                  <span className="text-orange-600 font-semibold">
                    ${booking.totalPrice}
                  </span>
                </p>
              </div>
            </div>

            {/* Right: Date & Status */}
            <div className="flex flex-col gap-2 text-sm md:text-base text-gray-600 w-full md:w-1/3">
              <p>
                <span className="font-medium">Check-In: </span>
                {booking.checkIn}
              </p>
              <p>
                <span className="font-medium">Check-Out: </span>
                {booking.checkOut}
              </p>
              <p>
                <span className="font-medium">Booked On: </span>
                {new Date(booking.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBooking;