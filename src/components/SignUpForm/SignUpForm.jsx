"use client";
import React, { useState } from "react";
import mailImage from "../../../public/mail_icon.svg";
import Image from "next/image";
import { EyeIcon } from "../icons/eyeIcon";
import { EyeSlashIcon } from "../icons/eyeSlashIcon";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useTokenContext from "@/context/TokenContext";

const SignUpForm = () => {
  const router = useRouter();
  const { token } = useTokenContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const sendData = async (formData) => {
    const response = await fetch(
      " https://dev-mrp.insby.tech/api/session/customer-sign-in",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await response.json();
    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      autoRegister: true,
      login: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };

    const passwordsMatch = formData.password === formData.confirmPassword;

    setPasswordsMatch(passwordsMatch);

    if (passwordsMatch) {
      const data = await sendData(body);
      if (data.data.token) {
        router.push("/login");
      }
    }
  };

  return (
    <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 relative">
        <label className="text-custom-black/75" htmlFor="email">
          Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={(e) => handleFieldChange(e)}
          required
          className="rounded-3xl border h-12 px-2 border-gray-950"
        />
        <Image src={mailImage} className="absolute right-6 top-14" />
      </div>
      <div className="flex flex-col gap-4 relative">
        <label className="text-custom-black/75" htmlFor="password">
          Create a password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          placeholder="Enter a strong password"
          className="rounded-3xl h-12 px-2 border border-gray-950"
          value={formData.password}
          required
          onChange={(e) => handleFieldChange(e)}
        />
        <button
          className="absolute right-2 top-11 cursor-pointer p-3"
          onClick={(e) => {
            e.preventDefault();
            setShowPassword(!showPassword);
          }}
        >
          {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
        </button>
      </div>
      <div className="flex flex-col gap-4 relative">
        <label className="text-custom-black/75" htmlFor="password">
          Confirm password
        </label>
        <input
          type={showConfirmPassword ? "text" : "password"}
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm your password"
          className={`rounded-3xl h-12 px-2 border border-gray-950 ${
            passwordsMatch ? "" : "border-2 border-red-600"
          }`}
          value={formData.confirmPassword}
          required
          onChange={(e) => handleFieldChange(e)}
        />
        {passwordsMatch ? (
          ""
        ) : (
          <p className="text-custom-red ">Passwords don't match</p>
        )}
        <button
          className="absolute right-2 top-11 cursor-pointer p-3"
          onClick={(e) => {
            e.preventDefault();
            setShowConfirmPassword(!showConfirmPassword);
          }}
        >
          {showConfirmPassword ? <EyeIcon /> : <EyeSlashIcon />}
        </button>
      </div>
      <button
        onClick={handleSubmit}
        className="h-12 bg-custom-red font-bold text-white w-full rounded-3xl mt-12"
      >
        Sign up
      </button>
      <input type="submit" hidden />
    </form>
  );
};
export default SignUpForm;
