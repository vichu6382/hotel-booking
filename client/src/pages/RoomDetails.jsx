import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { assets, facilityIcons, roomsDummyData } from "../assets/assets";
import StarRating from "../compontes/StarRating";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const selectedRoom = roomsDummyData.find((room) => room._id === id);
    if (selectedRoom) {
      setRoom(selectedRoom);
      setMainImage(selectedRoom.images[0]);
    }
  }, [id]);

  return (
    room && (
      <div className="py-28 md:py-36 px-4 md:px-16 lg:px-24 xl:px-32">
        {/* Title */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
          <h1 className="text-3xl md:text-4xl font-playfair">
            {room.hotel.name}{" "}
            <span className="font-inter text-base text-gray-600">
              ({room.roomType})
            </span>
          </h1>
          <span className="text-xs font-medium py-1.5 px-4 text-white bg-orange-500 rounded-full">
            20% OFF
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-3 text-gray-600">
          <StarRating />
          <p className="ml-2">200+ reviews</p>
        </div>

        {/* Address */}
        <div className="flex items-center gap-2 text-gray-500 mt-2 text-sm">
          <img src={assets.locationIcon} alt="location" className="w-4 h-4" />
          <span>{room.hotel.address}</span>
        </div>

        {/* Image Gallery */}
        <div className="flex flex-col lg:flex-row mt-8 gap-6">
          <div className="lg:w-1/2 w-full">
            <img
              src={mainImage}
              alt="Room"
              className="w-full h-96 object-cover rounded-xl shadow-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
            {room?.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="thumbnail"
                onClick={() => setMainImage(image)}
                className={`w-full h-44 object-cover rounded-xl cursor-pointer transition ${
                  mainImage === image
                    ? "ring-2 ring-orange-500 shadow-md"
                    : "hover:opacity-90"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="flex flex-col md:flex-row md:justify-between mt-12 gap-10">
          {/* Left Info */}
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-playfair mb-4">
              Experience Luxury Like Never Before
            </h2>

            {/* Amenities */}
            <div className="flex flex-wrap items-center mt-3 mb-6 gap-3">
              {room.amenities.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 shadow-sm"
                >
                  <img
                    src={facilityIcons[item]}
                    alt={item}
                    className="w-5 h-5"
                  />
                  <p className="text-sm text-gray-700">{item}</p>
                </div>
              ))}
            </div>

            {/* Price */}
            <p className="text-2xl font-semibold text-gray-800">
              ${room.pricePerNight}
              <span className="text-base text-gray-500"> / night</span>
            </p>
          </div>

          {/* Booking Form */}
          <form className="w-full md:w-[420px] bg-white shadow-lg p-6 rounded-xl flex flex-col gap-5">
            {/* Check-In */}
            <div>
              <label
                htmlFor="checkInDate"
                className="block font-medium text-gray-700 mb-1"
              >
                Check-In
              </label>
              <input
                type="date"
                id="checkInDate"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            {/* Check-Out */}
            <div>
              <label
                htmlFor="checkOutDate"
                className="block font-medium text-gray-700 mb-1"
              >
                Check-Out
              </label>
              <input
                type="date"
                id="checkOutDate"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            {/* Guests */}
            <div>
              <label
                htmlFor="guests"
                className="block font-medium text-gray-700 mb-1"
              >
                Guests
              </label>
              <input
                type="number"
                id="guests"
                min="1"
                placeholder="1"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all text-white font-medium rounded-lg w-full py-3 text-base cursor-pointer"
            >
              Check Availability
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default RoomDetails;
