"use client";
import { TokenContext } from "@/context/TokenContext";
import React, { useContext } from "react";

const LoginForm = () => {
  const token = useContext(TokenContext);
  return (
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
      <button className="h-12 bg-black font-medium text-white w-full rounded-3xl mt-6">
        Log in
      </button>
      ;
    </div>
  );
};

export default LoginForm;
