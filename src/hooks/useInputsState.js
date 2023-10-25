"use client";
import { validateField } from "@/utils/validation";
import { useCallback, useState } from "react";

export const useInputsState = (state) => {
  const [formData, setFormData] = useState(state);

  const handleFieldChange = useCallback((e) => {
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
  }, []);

  return {
    formData,
    handleFieldChange,
  };
};
