import Image from "next/image";
import React from "react";
import image from "../../../public/login_image.png";
import Link from "next/link";
import LoginForm from "@/components/LoginForm/loginForm";

export const LoginPage = () => {
  return (
    <div className="flex min-h-screen flex-col md:flex-row ">
      <div className="md:flex hidden  min-h-screen w-full bg-custom-red  justify-center items-center">
        <Image src={image} width={400} className="h-[400px]" />
      </div>
      <div className="flex  min-h-screen w-full justify-center items-center bg-white">
        <div className="mx-4 w-[350px]">
          <h2 className="text-[32px] text-custom-black font-bold mb-7">
            Log in
          </h2>
          <LoginForm />
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
