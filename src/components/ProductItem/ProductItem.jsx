import Image from "next/image";
import React from "react";
import Price from "../Price/Price";

const ProductItem = ({ item }) => {
  if (!item) return null;
  return (
    <div className="flex flex-col gap-10  sm:flex-row">
      <div className="relative self-center w-[80%]  h-[320px] sm:w-[50%] md:w-[40%] shrink-0">
        <Image
          src={item.image_url}
          className="object-fill rounded-3xl aspect-square"
          alt=""
          fill
        />
      </div>
      <div className="flex-1 flex sm:w-[40%] md:w-[60%] lg:h-[285px] flex-col justify-between gap-4 self-center ">
        <h2 className="text-4xl text-custom-black self-center md:self-start font-bold">
          {item.title}
        </h2>
        <p className="text-base text-custom-gray">{item.body}</p>
        <Price item={item} />
      </div>
    </div>
  );
};

export default ProductItem;
