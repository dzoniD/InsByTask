"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useTokenContext from "@/context/TokenContext";
import { sendData } from "../utils/fetchHelper";
import InputField from "../InputField/InputField";
import { validateField } from "../utils/validation";

const SignUpForm = () => {
  const router = useRouter();
  const { token } = useTokenContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({
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

  const handleFieldChange = (e) => {
    const { name, value } = e.target;

    const errMessages = validateField(name, value);

    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: {
          value: value,
          error: errMessages[name],
        },
      };
    });
  };

  const inputs = [
    {
      label: "Email address",
      type: "text",
      id: "email",
      name: "email",
      placeholder: "Enter your email",
      className: "rounded-3xl border h-12 px-2 border-gray-950",
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
      className: "rounded-3xl border h-12 px-2 border-gray-950",
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
      className: "rounded-3xl border h-12 px-2 border-gray-950",
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
      autoRegister: true,
      login: formData.email.value,
      password: formData.password.value,
      confirmPassword: formData.confirmPassword.value,
    };

    const data = await sendData(body, token);

    if (data.errors) {
      const resError = data.errors.sessions[0].split(".")[2];
      setFormError(resError);
    }
    if (data.data && data.data.token) {
      router.push("/login");
    }
  };

  return (
    <form className="flex flex-col gap-7" onSubmit={(e) => handleSubmit(e)}>
      {inputs.map((item) => {
        return <InputField {...item} key={item.name + "1"} />;
      })}
      {formError && <div className="text-custom-red">{formError}</div>}
      <button
        type="submit"
        className="h-12 bg-custom-red font-bold text-white w-full rounded-3xl mt-12"
      >
        Sign up
      </button>
      <input type="submit" hidden />
    </form>
  );
};
export default SignUpForm;
