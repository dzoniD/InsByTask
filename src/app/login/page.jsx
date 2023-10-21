import Image from "next/image";
import React from "react";
import image from "../../../public/login_image.png";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen flex-col md:flex-row ">
      <div className="md:flex hidden  min-h-screen w-full bg-custom-red  justify-center items-center">
        <Image src={image} width={400} className="h-[400px]" />
      </div>
      <div className="flex  min-h-screen w-full justify-center items-center bg-white">
        <div className="mx-4 w-[480px]">
          <h2 className="text-[32px] text-custom-black font-bold mb-7">
            Log in
          </h2>
          <div className="flex flex-col gap-9  ">
            <div className="flex flex-col gap-5">
              <label className="text-custom-black/75" htmlFor="email">
                Email address
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="rounded-3xl border h-12 px-2 border-gray-950"
              />
            </div>
            <div className="flex flex-col gap-5">
              <label className="text-custom-black/75" htmlFor="password">
                Password
              </label>
              <input
                type="text"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="rounded-3xl h-12 px-2 border border-gray-950"
              />
            </div>
          </div>
          <button className="h-12 bg-black font-medium text-white w-full rounded-3xl mt-6">
            Log in
          </button>
          <div className="mt-10 flex justify-center items-center text-custom-gray">
            <span>Don't have account?</span>
            <Link href={"/signup"} className="ml-1 cursor-pointer">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
