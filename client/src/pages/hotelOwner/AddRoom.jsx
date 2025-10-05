import React, { useState } from "react";
import Title from "../../compontes/Title"; // Fixed typo: compontes -> components
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddRoom = () => {
  const { axios, getToken } = useAppContext();
  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState({ 1: null, 2: null, 3: null, 4: null });
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !inputs.roomType ||
      !inputs.pricePerNight ||
      !Object.values(images).some(img => img)
    ) {
      toast.error("Please fill in all the details");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("roomType", inputs.roomType);
      formData.append("pricePerNight", inputs.pricePerNight);

      const amenities = Object.keys(inputs.amenities).filter(
        key => inputs.amenities[key]
      );
      formData.append("amenities", JSON.stringify(amenities));

      Object.keys(images).forEach(key => {
        if (images[key]) formData.append("images", images[key]);
      });

      const { data } = await axios.post("/api/rooms", formData, {
        headers: { 
          Authorization: `Bearer ${await getToken()}`,
          "Content-Type": "multipart/form-data" // Added content type for file upload
        },
      });

      if (data.success) {
        toast.success(data.message);
        setInputs({
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
        setImages({ 1: null, 2: null, 3: null, 4: null });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Add room error:", error);
      toast.error(error.response?.data?.message || error.message || "Something went wrong"); // Improved error handling
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (key, file) => {
    if (file) {
      setImages(prev => ({ ...prev, [key]: file }));
    }
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
          {Object.keys(images).map(key => (
            <label htmlFor={`roomImage${key}`} key={key} className="cursor-pointer">
              <img
                className="w-28 h-28 object-cover rounded-lg border border-gray-300 shadow-sm hover:opacity-80"
                src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea}
                alt="Upload placeholder"
              />
              <input
                type="file"
                accept="image/*"
                id={`roomImage${key}`}
                hidden
                onChange={e => handleImageChange(key, e.target.files[0])} // Fixed: extracted to function
              />
            </label>
          ))}
        </div>
      </div>

      {/* Room Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Room Type</label>
          <select
            name="roomType"
            value={inputs.roomType}
            onChange={e => setInputs(prev => ({ ...prev, roomType: e.target.value }))}
            className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Room Type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Room">Luxury Room</option>
            <option value="Family Suite">Family Suite</option>
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Price per Night ($)</label>
          <input
            type="number"
            name="pricePerNight"
            value={inputs.pricePerNight}
            placeholder="0"
            min="0"
            onChange={e => setInputs(prev => ({ ...prev, pricePerNight: e.target.value }))}
            className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      {/* Amenities */}
      <div>
        <p className="text-gray-800 font-medium mb-3">Amenities</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.keys(inputs.amenities).map(amenity => (
            <label key={amenity} htmlFor={`amenities-${amenity}`} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                id={`amenities-${amenity}`}
                checked={inputs.amenities[amenity]}
                onChange={() =>
                  setInputs(prev => ({
                    ...prev,
                    amenities: { ...prev.amenities, [amenity]: !prev.amenities[amenity] }
                  }))
                }
                className="cursor-pointer"
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
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Room"}
        </button>
      </div>
    </form>
  );
};

export default AddRoom;