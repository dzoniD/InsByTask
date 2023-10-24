export const validation = {
  passwordValidationRequirements: {
    required: {
      value: true,
      message: "This field is required",
    },
    minLength: {
      value: 3,
      message: "Password must contain at least 3 characters ",
    },
  },

  emailValidationRequirements: {
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/,
      message: "Form of the email is not correct. Type your whole email",
    },
    required: {
      value: true,
      message: "This field is required",
    },
  },
};

export const validateField = (name, value) => {
  let errMsg = {
    email: "",
    password: "",
  };

  if (
    name === "email" &&
    !validation.emailValidationRequirements.pattern.value.test(value)
  ) {
    errMsg[name] = validation.emailValidationRequirements.pattern.message;
  }

  if (
    name === "password" &&
    validation.passwordValidationRequirements.minLength.value > value.length
  ) {
    errMsg[name] = validation.passwordValidationRequirements.minLength.message;
  }

  return errMsg;
};
