"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useTokenContext from "@/context/TokenContext";
import { sendCredentials } from "../../utils/fetchHelper";
import InputField from "../InputField/InputField";
import Link from "next/link";
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

  const { email, password, confirmPassword } = formData;

  const inputs = [
    {
      label: "Email address",
      type: "text",
      id: "email",
      name: "email",
      placeholder: "Enter your email",
      value: email.value,
      handleChange: handleFieldChange,
      showPassword: true,
      disabled: false,
      errorMsg: email.error,
    },
    {
      label: "Password",
      type: "password",
      id: "password",
      name: "password",
      placeholder: "Enter your password",
      value: password.value,
      handleChange: handleFieldChange,
      showPassword,
      disabled: false,
      errorMsg: password.error,
      changePasswordVisibility: setShowPassword,
    },

    {
      label: "Confirm password",
      type: "password",
      id: "confirmPassword",
      name: "confirmPassword",
      placeholder: "Confirm your password",
      value: confirmPassword.value,
      handleChange: handleFieldChange,
      showPassword: showConfirmPassword,
      disabled: false,
      errorMsg: confirmPassword.error,
      changePasswordVisibility: setShowConfirmPassword,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.error || password.error || confirmPassword.error) {
      return;
    }

    const passwordsMatch = password.value === confirmPassword.value;

    if (!passwordsMatch) {
      setFormError("Passwords do not match");
      return;
    }

    setFormError("");

    const body = {
      autoRegister: true,
      login: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    };

    const responseData = await sendCredentials(body, token);

    if (responseData.sessions) {
      const resErrorMsg = responseData.sessions[0].split(".")[2];
      setFormError(resErrorMsg);
    }

    if (responseData && responseData.token) {
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
