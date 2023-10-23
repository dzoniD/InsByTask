import Image from "next/image";
import React from "react";

const ProductItem = ({ item }) => {
  if (!item) return null;
  return (
    <div className="flex flex-col gap-10 border border-black sm:flex-row">
      <div className="relative self-center w-[80%] border border-black h-[260px] sm:w-[50%] md:w-[40%] shrink-0">
        <Image
          src={item.image_url}
          className="object-fill rounded-3xl aspect-square"
          alt=""
          fill
        />
      </div>
      <div className="flex-1 flex sm:w-[40%] md:w-[60%] lg:h-[285px] flex-col justify-between gap-4 ">
        <h2 className="text-4xl text-custom-black self-center md:self-start font-bold">
          {item.title}
        </h2>
        <p className="text-base text-custom-gray">{item.body}</p>
        <div>
          <span className="inline-flex justify-center items-center text-lg font-medium bg-black rounded-3xl h-12 text-white w-[100%] sm:w-[125px]">
            {item.prices[0].price}
          </span>
          <span className="inline-flex sm:ml-5 mt-5 justify-center items-center text-lg font-medium bg-custom-red rounded-3xl h-12 text-white w-[100%]  sm:w-[125px]">
            {item.prices[0].member_price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
