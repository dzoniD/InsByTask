"use client";
import { validateField } from "@/components/utils/validation";
import React, { useCallback, useState } from "react";

export const useInputsState = (state) => {
  const [formData, setFormData] = useState(state);

  const handleFieldChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      const errMessages = validateField(name, value);
      setFormData((prevData) => {
        console.log("custom hook");
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

  return {
    formData,
    handleFieldChange,
  };
};
