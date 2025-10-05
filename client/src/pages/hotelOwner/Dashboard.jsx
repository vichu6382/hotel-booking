import  { useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import Title from "../../compontes/Title";

const Dashboard = () => {
  const { currency, user, getToken, toast, axios } = useAppContext();

  const [dashboardData, setDashboardData] = useState({
    bookings: [],
    totalBookings: 0,
    totalRevenue: 0,
  });

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/bookings/hotel", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success && data.dashboardData) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message || "Failed to fetch dashboard data");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

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
            <p className="text-blue-500 text-lg">Total Bookings</p>
            <p className="text-neutral-400 text-base">
              {dashboardData.totalBookings}
            </p>
          </div>
        </div>
        {/* total Revenue */}
        <div className="bg-primary/3 border border-primary/10 rotate flex p-4 pr-8">
          <img
            src={assets.totalRevenueIcon}
            alt=""
            className="mx-sm:hidden h-10"
          />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-blue-500 text-lg">Total Revenue</p>
            <p className="text-neutral-400 text-base">
              {currency} {dashboardData.totalRevenue}
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
                Total Amount
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {dashboardData.bookings.map((item, index) => (
              <tr key={index}>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {item.user?.username || item.user?.name || item.user?.email || "-"}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden">
                  {item.room?.roomType || "-"}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 text-center">
                  {currency} {item.totalPrice}
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