import React, { useState } from "react";
import { assets, facilityIcons } from "../assets/assets";
import { useNavigate, useSearchParams } from "react-router-dom";
import StarRating from "../compontes/StarRating";
import { useAppContext } from "../context/AppContext";

const CheckBox = ({ label, selected = false, onChange = () => {} }) => (
  <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
    <input
      type="checkbox"
      checked={selected}
      onChange={(e) => onChange(e.target.checked, label)}
      className="accent-black"
    />
    <span className="font-light select-none">{label}</span>
  </label>
);

const AllRooms = () => {
  const [searchParams] = useSearchParams();
  const { rooms, currency } = useAppContext();
  const navigate = useNavigate();
  const [openFilter, setOpenFilter] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState({
    roomTypes: [],
    priceRanges: [],
  });

  const roomTypes = ["Single Bed", "Double Bed", "Luxury Room", "Family Suite"];
  const priceRanges = [
    "$0 – $500",
    "$500 – $1000",
    "$1000 – $2000",
    "$2000 – $3000",
  ];

  // Controlled filter change
  const handleFilterChange = (checked, value, type) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (checked) {
        updatedFilters[type] = [...updatedFilters[type], value];
      } else {
        updatedFilters[type] = updatedFilters[type].filter((item) => item !== value);
      }
      return updatedFilters;
    });
  };

  // Room type filter
  const matchesRoomType = (room) => {
    return (
      selectedFilters.roomTypes.length === 0 ||
      selectedFilters.roomTypes.includes(room.roomType)
    );
  };

  // Price range filter
  const matchesPriceRange = (room) => {
    if (selectedFilters.priceRanges.length === 0) return true;
    return selectedFilters.priceRanges.some((range) => {
      // Parse "$0 – $500"
      const [minStr, maxStr] = range.replace(/\$/g, "").split("–").map((s) => s.trim());
      const min = Number(minStr);
      const max = Number(maxStr);
      return room.pricePerNight >= min && room.pricePerNight <= max;
    });
  };

  // Destination filter
  const filterDestination = (room) => {
    const destination = searchParams.get("destination");
    if (!destination) return true;
    return (
      room.hotel?.city?.toLowerCase().includes(destination.toLowerCase())
    );
  };

  // Final filtered rooms
  const filteredRooms = (rooms || [])
    .filter(matchesRoomType)
    .filter(matchesPriceRange)
    .filter(filterDestination);

  return (
    <div className="flex flex-col-reverse lg:flex-row items-start justify-between pt-28 px-4 md:px-12 lg:px-20 xl:px-32 gap-8">
      {/* Left Section - Room Listings */}
      <div className="w-full lg:w-3/4">
        {/* Page Header */}
        <div className="flex flex-col items-start text-left mb-8">
          <h1 className="font-playfair text-3xl md:text-4xl lg:text-[40px]">
            Hotel Rooms
          </h1>
          <p className="text-sm md:text-base text-gray-500 mt-2 max-w-xl">
            Discover a selection of the finest rooms tailored to your needs.
          </p>
        </div>

        {/* Rooms List */}
        {filteredRooms.length === 0 && (
          <div className="text-gray-500 text-center py-12">No rooms found.</div>
        )}
        {filteredRooms.map((room) => (
          <div
            key={room._id}
            className="flex flex-col md:flex-row gap-6 py-8 border-b border-gray-200 last:border-0"
          >
            {/* Room Image */}
            <img
              onClick={() => {
                navigate(`/rooms/${room._id}`);
                window.scrollTo(0, 0);
              }}
              src={room.images?.[0] || assets.roomImg1}
              alt="hotel-img"
              title="View Room Details"
              className="w-full md:w-1/2 h-64 md:h-72 object-cover rounded-xl shadow-md cursor-pointer hover:opacity-90 transition"
            />

            {/* Room Details */}
            <div className="w-full md:w-1/2 flex flex-col justify-between gap-4">
              <p className="text-gray-500 text-sm">{room.hotel?.city}</p>

              <p
                onClick={() => {
                  navigate(`/rooms/${room._id}`);
                  window.scrollTo(0, 0);
                }}
                className="text-gray-800 text-2xl md:text-3xl font-playfair cursor-pointer hover:text-black/80 transition"
              >
                {room.hotel?.name}
              </p>

              <div className="flex items-center">
                <StarRating />
                <p className="ml-2 text-sm md:text-base text-gray-600">
                  200+ reviews
                </p>
              </div>

              <div className="flex items-center gap-2 text-gray-500 mt-1 text-sm">
                <img
                  src={assets.locationIcon}
                  alt="location"
                  className="w-4 h-4"
                />
                <span>{room.hotel?.address}</span>
              </div>

              <div className="flex flex-wrap items-center mt-3 gap-3">
                {(room.amenities || []).map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-100"
                  >
                    <img
                      src={facilityIcons[item]}
                      alt={item}
                      className="w-5 h-5"
                    />
                    <p className="text-xs md:text-sm">{item}</p>
                  </div>
                ))}
              </div>

              <p className="text-xl font-semibold text-gray-700">
                {currency}${room.pricePerNight}/night
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Right Section - Filter */}
      <div className="bg-white w-full lg:w-80 border border-gray-200 rounded-xl shadow-sm text-gray-700">
        {/* Filter Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
          <p className="text-base font-medium">Filters</p>
          <div>
            <span
              onClick={() => setOpenFilter(!openFilter)}
              className="lg:hidden cursor-pointer text-sm font-medium text-blue-600"
            >
              {openFilter ? "Hide" : "Show"}
            </span>
            <span
              className="hidden lg:block cursor-pointer text-sm font-medium text-blue-600"
              onClick={() =>
                setSelectedFilters({ roomTypes: [], priceRanges: [] })
              }
            >
              Clear
            </span>
          </div>
        </div>

        {/* Filter Content */}
        <div
          className={`${
            openFilter ? "h-auto" : "h-0 lg:h-auto"
          } overflow-hidden transition-all duration-500`}
        >
          {/* Room Types */}
          <div className="px-5 pt-5">
            <p className="font-medium text-gray-800 pb-2">Room Types</p>
            {roomTypes.map((room, index) => (
              <CheckBox
                key={index}
                label={room}
                selected={selectedFilters.roomTypes.includes(room)}
                onChange={(checked) =>
                  handleFilterChange(checked, room, "roomTypes")
                }
              />
            ))}
          </div>

          {/* Price Range */}
          <div className="px-5 pt-5 pb-5">
            <p className="font-medium text-gray-800 pb-2">Price Range</p>
            {priceRanges.map((range, index) => (
              <CheckBox
                key={index}
                label={range}
                selected={selectedFilters.priceRanges.includes(range)}
                onChange={(checked) =>
                  handleFilterChange(checked, range, "priceRanges")
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;