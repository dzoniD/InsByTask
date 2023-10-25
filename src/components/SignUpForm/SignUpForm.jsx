"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useTokenContext from "@/context/TokenContext";
import { sendCredentials } from "../../utils/fetchHelper";
import InputField from "../InputField/InputField";
import Link from "next/link";
import { baseInputClasses } from "../../utils/constants";
import { useInputsState } from "@/hooks/useInputsState";

const SignUpForm = () => {
  const router = useRouter();
  const { token } = useTokenContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState("");

  const { formData, handleFieldChange } = useInputsState({
    email: {
      value: "",
      error: "",
    },
    password: {
      value: "",
      error: "",
    },
    confirmPassword: {
      value: "",
      error: "",
    },
  });

  const inputs = [
    {
      label: "Email address",
      type: "text",
      id: "email",
      name: "email",
      placeholder: "Enter your email",
      className: baseInputClasses,
      value: formData.email.value,
      fn: handleFieldChange,
      showPassword: true,
      errorMsg: formData.email.error,
    },
    {
      label: "Password",
      type: "password",
      id: "password",
      name: "password",
      placeholder: "Enter your password",
      className: baseInputClasses,
      value: formData.password.value,
      fn: handleFieldChange,
      showPassword,
      errorMsg: formData.password.error,
      changePasswordVisibility: setShowPassword,
    },

    {
      label: "Confirm password",
      type: "password",
      id: "confirmPassword",
      name: "confirmPassword",
      placeholder: "Confirm your password",
      className: baseInputClasses,
      value: formData.confirmPassword.value,
      fn: handleFieldChange,
      showPassword: showConfirmPassword,
      errorMsg: formData.confirmPassword.error,
      changePasswordVisibility: setShowConfirmPassword,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.email.error ||
      formData.password.error ||
      formData.confirmPassword.error
    ) {
      return;
    }

    const passwordsMatch =
      formData.password.value === formData.confirmPassword.value;

    if (!passwordsMatch) {
      setFormError("Passwords do not match");
      return;
    }

    setFormError("");

    const body = {
      //mozda klasa
      autoRegister: true,
      login: formData.email.value,
      password: formData.password.value,
      confirmPassword: formData.confirmPassword.value,
    };

    const data = await sendCredentials(body, token);
    console.log(data);
    if (data.errors) {
      const resError = data.errors.sessions[0].split(".")[2];
      setFormError(resError);
    }
    if (data && data.token) {
      router.push("/login");
    }
  };

  return (
    <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
      {inputs.map((item) => {
        return <InputField {...item} key={item.id} />;
      })}
      {formError && <div className="text-custom-red">{formError}</div>}

      <button
        type="submit"
        className="h-12 bg-custom-red font-bold text-white w-full rounded-3xl mt-8"
      >
        Sign up
      </button>
      <div className="flex justify-center mt-4 items-center text-custom-gray">
        <span>Already have an account?</span>
        <Link href={"/login"} className="ml-1 cursor-pointer">
          Log in
        </Link>
      </div>
    </form>
  );
};
export default SignUpForm;
