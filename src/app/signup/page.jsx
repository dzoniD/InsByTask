import Image from "next/image";
import Link from "next/link";
import React from "react";
import image from "../../../public/signup_image.png";
import mailImage from "../../../public/mail_icon.svg";
import SignUpForm from "@/components/SignUpForm/SignUpForm";

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
          <SignUpForm />
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
