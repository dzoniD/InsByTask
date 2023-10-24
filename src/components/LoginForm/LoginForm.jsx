"use client";
import useTokenContext from "@/context/TokenContext";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import InputField from "../InputField/InputField";
import { validateField } from "../utils/validation";
import { sendData } from "../utils/fetchHelper";

const LoginForm = () => {
  const router = useRouter();
  const { token } = useTokenContext();
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");

  const [formData, setFormData] = useState({
    email: {
      value: "test",
      error: "",
    },
    password: {
      value: "test",
      error: "",
    },
  });

  const handleFieldChange = useCallback(
    (e) => {
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
    },
    [formData]
  );

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
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      autoRegister: true,
      login: formData.email.value,
      password: formData.password.value,
    };

    if (
      formData.email.value &&
      formData.password.value &&
      !formData.email.error &&
      !formData.password.error
    ) {
      const data = await sendData(body, token);

      if (data.data && data.data.token) {
        router.push("/");
      }

      if (data.errors) {
        const resError = data.errors.sessions[0].split(".")[2];
        setFormError(resError);
      }
    }
  };

  return (
    <form className="flex flex-col gap-9" onSubmit={handleSubmit}>
      {inputs?.map((item) => {
        return (
          <InputField
            {...item}
            key={item.id + "2"}
            change={handleFieldChange}
          />
        );
      })}
      {formError && <div className="text-custom-red">{formError}</div>}
      <button
        type="submit"
        className="h-12 bg-black font-medium text-white w-full rounded-3xl mt-6"
      >
        Log in
      </button>
    </form>
  );
};

export default LoginForm;
