export const validation = {
  passwordValidationRequirements: {
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
  },
};

export const validateField = (name, value) => {
  let errMsg = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  if (
    name === "email" &&
    !validation.emailValidationRequirements.pattern.value.test(value)
  ) {
    errMsg[name] = validation.emailValidationRequirements.pattern.message;
  }

  if (
    (name === "password" || name === "confirmPassword") &&
    validation.passwordValidationRequirements.minLength.value > value.length
  ) {
    errMsg[name] = validation.passwordValidationRequirements.minLength.message;
  }

  return errMsg;
};
