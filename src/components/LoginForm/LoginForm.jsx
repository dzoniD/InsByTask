"use client";
import useTokenContext from "@/context/TokenContext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import InputField from "../InputField/InputField";
import { sendCredentials } from "../../utils/fetchHelper";
import { useAuth } from "@/context/AuthContext";
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
      value: formData.email.value,
      fn: handleFieldChange,
      showPassword: true,
      disabled: false,
      errorMsg: formData.email.error,
    },
    {
      label: "Password",
      type: "password",
      id: "password",
      name: "password",
      placeholder: "Enter your password",
      value: formData.password.value,
      fn: handleFieldChange,
      showPassword,
      disabled: false,
      errorMsg: formData.password.error,
      changePasswordVisibility: setShowPassword,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (email.error || password.error) {
      return;
    }

    const body = {
      autoRegister: true,
      login: email.value,
      password: password.value,
    };

    const responseData = await sendCredentials(body, token);

    if (responseData && responseData.token) {
      login(responseData.token, responseData.customer);
      router.push("/");
    }

    if (responseData.sessions) {
      const resErrorMsg = responseData.sessions[0].split(".")[2];
      setFormError(resErrorMsg);
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      {inputs?.map((item) => {
        return <InputField {...item} key={item.id} />;
      })}
      {formError && <div className="text-custom-red mb-2">{formError}</div>}
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
