import React, { useState } from "react";
import Title from "../../compontes/Title";
import { assets, dashboardDummyData } from "../../assets/assets";

const Dashboard = () => {
  const [dashboradData, setDashboradData] = useState(dashboardDummyData);

  return (
    <div className="">
      {/* Page Title */}
      <Title
        align="left"
        font="outfit"
        title="Dashboard"
        subTitle="Quick overview of your bookings, revenue, and recent activities."
      />
      <div className="flex gap-4 my-8">
        {/* total booking */}
        <div className="bg-primary/3 border border-primary/10 rotate flex p-4 pr-8">
          <img
            src={assets.totalBookingIcon}
            alt=""
            className="mx-sm:hidden h-10"
          />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-blue-500 text-lg">Todal Bookings</p>
            <p className="text-neutral-400 text-base">
              {dashboradData.totalBookings}
            </p>
          </div>
        </div>
        {/* total Revence */}
        <div className="bg-primary/3 border border-primary/10 rotate flex p-4 pr-8">
          <img
            src={assets.totalRevenueIcon}
            alt=""
            className="mx-sm:hidden h-10"
          />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-blue-500 text-lg">Todal Revenue</p>
            <p className="text-neutral-400 text-base">
              {dashboradData.totalBookings}
            </p>
          </div>
        </div>
      </div>
      {/* Recent booking */}
      <h2 className="text-xl text-blue-950/70 font-medium mb-5">
        Recent Booking
      </h2>

      <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">User Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">
                Room Name
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Todal Amount
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {dashboradData.bookings.map((item, index) => (
              <tr key={index}>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {item.user.username}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden">
                  {item.room.roomType}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 text-center">
                 $ {item.totalPrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
