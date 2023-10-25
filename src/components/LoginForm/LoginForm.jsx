"use client";
import useTokenContext from "@/context/TokenContext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import InputField from "../InputField/InputField";
import { sendCredentials } from "../../utils/fetchHelper";
import { useAuth } from "@/context/AuthContext";
import { baseInputClasses } from "../../utils/constants";
import { useInputsState } from "@/hooks/useInputsState";

const LoginForm = () => {
  const { login } = useAuth();
  const router = useRouter();
  const { token } = useTokenContext();
  const [showPassword, setShowPassword] = useState(false);
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
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    const body = {
      autoRegister: true,
      login: email.value,
      password: password.value,
    };

    if (email.value && password.value && !email.error && !password.error) {
      const responseData = await sendCredentials(body, token);

      if (responseData && responseData.token) {
        //todo:proveri ovaj deo
        //todo:rename data
        login(responseData.token, responseData.customer);
        router.push("/");
      }

      if (responseData.errors) {
        const resError = responseData.errors.sessions[0].split(".")[2];
        setFormError(resError);
      }
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      {inputs?.map((item) => {
        return <InputField {...item} key={item.id} />;
      })}
      {formError && <div className="text-custom-red">{formError}</div>}
      <button
        type="submit"
        className="h-12 bg-black font-medium text-white w-full rounded-3xl"
      >
        Log in
      </button>
    </form>
  );
};

export default LoginForm;
