import React from "react";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const sidebarLinks = [
    { name: "Dashboard", path: "/owner", icon: assets.dashboardIcon },
    { name: "Add Room", path: "/owner/add-room", icon: assets.addIcon },
    { name: "List Room", path: "/owner/list-room", icon: assets.listIcon },
  ];

  return (
    <div className="md:w-64 w-16 border-r h-full text-base border-gray-300 pt-4 flex flex-col transition-all duration-300 bg-white shadow-sm">
      {sidebarLinks.map((item, index) => (
        <NavLink
          to={item.path}
          key={index}
          end={item.path === "/owner"}
          className={({ isActive }) =>
            `flex items-center py-3 px-3 md:px-8 gap-3 transition-colors duration-200 ${
              isActive
                ? "border-r-4 md:border-r-[6px] bg-blue-600/10 border-blue-600 text-blue-600 font-medium"
                : "hover:bg-gray-100 text-gray-700"
            }`
          }
        >
          <img src={item.icon} alt={item.name} className="h-6 w-6" />
          <p className="md:block hidden">{item.name}</p>
        </NavLink>
      ))}
    </div>
  );
}

export default Sidebar;
