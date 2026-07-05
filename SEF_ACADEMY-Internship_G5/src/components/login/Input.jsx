import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({
  label,
  type,
  placeholder,
  register,
  error,
  icon,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="mb-5">
      <label className="mb-2 block text-sm font-semibold text-amazon-textDark">
        {label}
      </label>

      <div className="flex items-center rounded-xl border border-amazon-border bg-white px-4 focus-within:border-amazon-orange">
        <span className="text-amazon-textLight">
          {icon}
        </span>

        <input
          type={
            isPassword
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          placeholder={placeholder}
          {...register}
          className="w-full bg-transparent px-3 py-3 outline-none"
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="cursor-pointer text-amazon-textLight hover:text-amazon-textDark transition"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default Input;