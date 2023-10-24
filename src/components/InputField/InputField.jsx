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
  fn,
  showPassword,
  changePasswordVisibility,
  errorMsg,
}) => {
  return (
    <div className="flex flex-col gap-5 relative">
      <label className="text-custom-black/75" htmlFor="email">
        {label}
      </label>
      <input
        type={showPassword ? "text" : "password"}
        id={id}
        name={name}
        placeholder={placeholder}
        className={`rounded-3xl h-12 px-2 border border-gray-950 ${
          errorMsg ? "border-2 border-red-600" : ""
        }`}
        value={value}
        required
        onChange={(e) => fn(e)}
      />
      {name === "email" && (
        <Image
          alt="envelope icon"
          src={mailIcon}
          className="absolute right-6 top-14"
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
      {errorMsg && <p className="text-custom-red">{errorMsg}</p>}
    </div>
  );
};

export default InputField;
