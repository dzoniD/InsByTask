"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import InputField from "../InputField/InputField";
import profileImg from "../../../public/3135715.png";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const UserForm = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [persistentUser, setPersistentUser] = useState(null);
  const email = [
    {
      label: "Name",
      type: "text",
      id: "name",
      name: "name",
      placeholder: "",
      className: "rounded-3xl border h-12 px-2 border-gray-950",
      value: user?.data?.name || persistentUser?.name,
      showPassword: true,
      errorMsg: "",
      disabled: true,
    },
    {
      label: "Email address",
      type: "text",
      id: "email",
      name: "email",
      placeholder: "",
      className: "rounded-3xl border h-12 px-2 border-gray-950",
      value: user?.data?.email || persistentUser?.email,
      showPassword: true,
      errorMsg: "",
      disabled: true,
    },
    {
      label: "Phone number",
      type: "tel",
      id: "phone",
      name: "phone",
      placeholder: "",
      className: "rounded-3xl border h-12 px-2 border-gray-950",
      value: user?.data?.phone_number || persistentUser?.phone_number,
      showPassword: true,
      errorMsg: "",
      disabled: true,
    },
  ];

  useEffect(() => {
    if (!user?.authenticated) {
      const userFromStorage = localStorage.getItem("user");
      if (!userFromStorage) {
        router.push("/login");
      }
      setPersistentUser(JSON.parse(userFromStorage));
    }
  }, []);

  if (!user?.authenticated) {
    return <div></div>;
  }

  return (
    <div className="h-max w-full sm:w-3/4 md:w-2/3 lg:w-2/4 xl:w-2/4  rounded-lg px-5 py-7 flex flex-col border ">
      <div className="w-[200px] self-center h-[200px] rounded-full bg-blue-300">
        <Image src={profileImg} alt="profile pic" />
      </div>
      {email.map((item, i) => (
        <InputField {...item} key={item.name + i} />
      ))}

      <Link
        href={"/"}
        className="w-max absolute bg-green-500 top-3 left-0 text-white p-4 rounded-lg ml-3"
      >
        Back
      </Link>
      <Link
        href={"/"}
        onClick={logout}
        className="w-max absolute bg-red-600 top-3 right-0 text-white p-4 rounded-lg mr-3"
      >
        Sign Out
      </Link>
    </div>
  );
};

export default UserForm;
