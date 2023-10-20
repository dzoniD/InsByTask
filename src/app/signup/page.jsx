import Image from "next/image";
import Link from "next/link";
import React from "react";
import image from "../../../public/signup_image.png";
import mailImage from "../../../public/mail_icon.svg";

export const SignUpPage = () => {
  return (
    <div className="flex min-h-screen flex-col md:flex-row ">
      <div className="md:flex md:flex-2 hidden  min-h-screen w-full bg-white  justify-center items-center">
        <Image src={image} width={400} className="h-[400px]" />
      </div>
      <div className="flex  min-h-screen w-full justify-center items-center bg-white">
        <div className="mx-4 w-[480px] md:w-full lg:w-[480px]">
          <div className="flex gap-2 flex-col mb-24">
            <h2 className="text-5xl w-max mx-auto text-custom-black font-bold ">
              Sign up
            </h2>
            <p className="w-max text-custom-gray mx-auto">
              Enter your details to get started
            </p>
          </div>
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-4 relative">
              <label className="text-custom-black/75" htmlFor="email">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email address"
                className="rounded-3xl border h-12 px-2 border-gray-950"
              />
              <Image src={mailImage} className="absolute right-6 top-14" />
            </div>
            <div className="flex flex-col gap-4">
              <label className="text-custom-black/75" htmlFor="password">
                Create a password
              </label>
              <input
                type="text"
                id="password"
                name="password"
                placeholder="Enter a strong password"
                className="rounded-3xl h-12 px-2 border border-gray-950"
              />
            </div>
            <div className="flex flex-col gap-4">
              <label className="text-custom-black/75" htmlFor="password">
                Consfirm password
              </label>
              <input
                type="text"
                id="password"
                name="password"
                placeholder="Confirm your password"
                className="rounded-3xl h-12 px-2 border border-gray-950"
              />
            </div>
          </div>
          <button className="h-12 bg-custom-red font-bold text-white w-full rounded-3xl mt-12">
            Sign up
          </button>
          <div className="mt-10 flex justify-center items-center text-custom-gray">
            <span>Already have an account?</span>
            <Link href={"/login"} className="ml-1 cursor-pointer">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
