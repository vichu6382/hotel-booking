import React, { useState } from "react";
import Title from "../compontes/Title";
import { assets, userBookingsDummyData } from "../assets/assets";

const MyBooking = () => {
  const [bookings, setBookings] = useState(userBookingsDummyData);

  return (
    <div className="py-28 md:pb-36 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32">
      {/* Page Title */}
      <Title
        title="My Bookings"
        subTitle="View and manage your hotel reservations. Track your check-in, check-out dates, and booking details here."
        align={"left"}
      />

      <div className="max-w-6xl mt-10 w-full text-gray-800 space-y-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md transition"
          >
            {/* Left: Hotel Info */}
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-2/3">
              <img
                src={booking.room.images[0]}
                alt="hotel"
                className="w-full md:w-40 h-32 object-cover rounded-lg shadow-sm"
              />
              <div className="flex flex-col gap-2">
                {/* Hotel Name */}
                <p className="font-playfair text-xl md:text-2xl text-gray-800">
                  {booking.hotel.name}{" "}
                  <span className="font-inter text-sm text-gray-500">
                    ({booking.room.roomType})
                  </span>
                </p>

                {/* Address */}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <img src={assets.locationIcon} alt="location" className="w-4 h-4" />
                  <span>{booking.hotel.address}</span>
                </div>

                {/* Guests */}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <img src={assets.guestsIcon} alt="guests" className="w-4 h-4" />
                  <span>{booking.hotel.guests} Guests</span>
                </div>

                {/* Price */}
                <p className="text-base font-medium text-gray-700">
                  Total: <span className="text-orange-600 font-semibold">${booking.totalPrice}</span>
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
                {booking.createdAt}
              </p>
             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBooking;
