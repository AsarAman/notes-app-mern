/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { FaRegEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
function Input({
  label,
  name,
  type,
  hanleChange,
  value,
  placeholder,
  accept,
  togglePassword,
  showPassword,
  typePassword,
}) {
  return (
    <div className="form-input">
      <label>{label}</label>
      <input
        onChange={hanleChange}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        accept={accept}
      />
      {typePassword && (
        <span onClick={togglePassword}>
          {showPassword ? (
            <IoMdEyeOff color="blue" />
          ) : (
            <FaRegEye color="blue" />
          )}
        </span>
      )}
    </div>
  );
}

export default Input;
