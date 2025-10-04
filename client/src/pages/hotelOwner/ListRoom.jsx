import React, { useState } from "react";
import { assets, roomsDummyData } from "../../assets/assets"; // Replace with owner rooms
import Title from "../../compontes/Title";

const ListRoom = () => {
  const [rooms, setRooms] = useState(roomsDummyData); // replace with owner's rooms

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      setRooms(rooms.filter((room) => room._id !== id));
    }
  };

  return (
    <div >
      <Title
        align="left"
        title="Your Rooms"
        subTitle="Manage all the rooms you have listed. Edit or remove rooms easily."
      />

      <div className="mt-8 overflow-x-auto w-full">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Room Type</th>
              <th className="px-4 py-2 text-left">Price/Night</th>
              <th className="px-4 py-2 text-left">Amenities</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room._id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-2">
                  <img
                    src={room.images[0]}
                    alt={room.roomType}
                    className="w-24 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2">{room.roomType}</td>
                <td className="px-4 py-2">${room.pricePerNight}</td>
                <td className="px-4 py-2">
                  {room.amenities.join(", ")}
                </td>
                <td className="px-4 py-2 flex gap-2">
            
                  <button
                    onClick={() => handleDelete(room._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {rooms.length === 0 && (
        <p className="mt-6 text-gray-500">No rooms listed yet.</p>
      )}
    </div>
  );
};

export default ListRoom;
