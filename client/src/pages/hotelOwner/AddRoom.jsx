import React, { useState } from "react";
import Title from "../../compontes/Title";
import { assets } from "../../assets/assets";

const AddRoom = () => {
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [inputs, setInputs] = useState({
    roomType: "",
    pricePerNight: "",
    amenities: {
      "Free Wifi": false,
      "Free Breakfast": false,
      "Room Service": false,
      "Mountain View": false,
      "Pool Access": false,
    },
  });

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleAmenityChange = (amenity) => {
    setInputs({
      ...inputs,
      amenities: {
        ...inputs.amenities,
        [amenity]: !inputs.amenities[amenity],
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", { ...inputs, images });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Title
        align="left"
        font="outfit"
        title="Add Room"
        subTitle="Fill in the details below to add a new room."
      />

      {/* Upload Images */}
      <div>
        <p className="text-gray-800 font-medium mb-3">Upload Images</p>
        <div className="grid grid-cols-2 sm:flex gap-4 flex-wrap">
          {Object.keys(images).map((key) => (
            <label
              htmlFor={`RoomImage${key}`}
              key={key}
              className="cursor-pointer"
            >
              <img
                className="w-28 h-28 object-cover rounded-lg border border-gray-300 shadow-sm hover:opacity-80"
                src={
                  images[key]
                    ? URL.createObjectURL(images[key])
                    : assets.uploadArea
                }
                alt="Upload placeholder"
              />
              <input
                type="file"
                accept="image/*"
                id={`RoomImage${key}`}
                hidden
                onChange={(e) =>
                  setImages({ ...images, [key]: e.target.files[0] })
                }
              />
            </label>
          ))}
        </div>
      </div>

      {/* Room Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Room Type
          </label>
          <select
            name="roomType"
            value={inputs.roomType}
            onChange={handleInputChange}
            className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Room Type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Room">Luxury Room</option>
            <option value="Family Suite">Family Suite</option>
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Price per Night ($)
          </label>
          <input
            type="number"
            name="pricePerNight"
            value={inputs.pricePerNight}
            placeholder="0"
            onChange={e=>setInputs({...inputs ,pricePerNight:e.target.value})}
            className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Amenities */}
      <div>
        <p className="text-gray-800 font-medium mb-3">Amenities</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.keys(inputs.amenities).map((amenity) => (
            <label
              key={amenity}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={inputs.amenities[amenity]}
                onChange={() => handleAmenityChange(amenity)}
              />
              <span className="text-sm text-gray-700">{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition active:scale-95"
        >
          Add Room
        </button>
      </div>
    </form>
  );
};

export default AddRoom;
