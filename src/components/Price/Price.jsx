"use client";
import { useAuth } from "@/context/AuthContext";
import React from "react";

export const Price = ({ item }) => {
  const { user } = useAuth();
  return (
    <div>
      <span className="inline-flex justify-center items-center text-lg font-medium bg-black rounded-3xl h-12 text-white w-[100%] sm:w-[125px]">
        {item.prices[0].price}
      </span>
      {user?.authenticated && (
        <span className="inline-flex sm:ml-5 mt-5 justify-center items-center text-lg font-medium bg-custom-red rounded-3xl h-12 text-white w-[100%]  sm:w-[125px]">
          {item.prices[0].member_price}
        </span>
      )}
    </div>
  );
};

export default Price;
