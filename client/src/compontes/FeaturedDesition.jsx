import React from "react";
import { roomsDummyData } from "../assets/assets";
import HotalCard from "./HotalCard";
import Title from "./Title";
import { useNavigate } from "react-router-dom";

const FeaturedDesition = () => {
    const navigate  = useNavigate()
  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 ng-slate-50 py-20">
      <Title
        title={"Featurd Destination"}
        subTitle={
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia praesentium est, sed dignissimos ducimus repudiandae quasi asperiores provident corporis voluptatibus"
        }
      />
      <div className="flex flex-wrap items-center gap-6 mt-20 ">
        {roomsDummyData.slice(0, 4).map((room, index) => (
          <HotalCard key={room._id} room={room} index={index} />
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/rooms");
          scrollTo();
        }}
        className="mt-10 px-4 py-4 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer"
      >
        View All Destinations
      </button>
    </div>
  );
};

export default FeaturedDesition;
