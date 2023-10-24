import { EyeIcon } from "../icons/eyeIcon";
import { EyeSlashIcon } from "../icons/eyeSlashIcon";

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
      {name === "password" && (
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
