import { EyeIcon } from "../icons/eyeIcon";
import { EyeSlashIcon } from "../icons/eyeSlashIcon";
import mailIcon from "../../../public/mail_icon.svg";
import Image from "next/image";

const InputField = ({
  label,
  id,
  name,
  placeholder,
  value,
  handleChange,
  showPassword,
  changePasswordVisibility,
  errorMsg,
  disabled,
}) => {
  return (
    <div className="flex flex-col mb-4 relative">
      <label className="text-custom-black/75" htmlFor={id}>
        {label}
      </label>
      <input
        type={showPassword ? "text" : "password"}
        id={id}
        name={name}
        placeholder={placeholder}
        className={`inputBase mt-5 mb-2 ${
          errorMsg ? "border-2 border-red-600" : ""
        }`}
        value={value}
        required
        onChange={(e) => handleChange(e)}
        disabled={disabled}
      />
      {name === "email" && (
        <Image
          alt="envelope icon"
          src={mailIcon}
          className="absolute right-5 top-14"
        />
      )}
      {(name === "password" || name === "confirmPassword") && (
        <div
          className="absolute right-2 top-12 cursor-pointer p-3"
          onClick={(e) => {
            e.preventDefault();
            changePasswordVisibility(!showPassword);
          }}
        >
          {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
        </div>
      )}
      <p className="text-custom-red h-6">{errorMsg}</p>
    </div>
  );
};

export default InputField;
