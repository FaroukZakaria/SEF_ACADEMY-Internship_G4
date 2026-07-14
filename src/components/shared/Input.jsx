import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({
  label,
  type,
  placeholder,
  register,
  error,
  icon,
  className="",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="mb-5">
      <label className="mb-2 block text-sm font-semibold text-amazon-textDark">
        {label}
      </label>

      <div className="flex items-center rounded-xl border border-amazon-border bg-amazon-surface px-4 transition-colors focus-within:border-amazon-orange">
        {icon && <span className="text-amazon-textLight">{icon}</span>}

        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          {...register}
          {...props}
          className={`w-full bg-transparent py-3 outline-none text-amazon-textDark placeholder:text-amazon-textLight ${className? className : "px-3"}`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="cursor-pointer text-amazon-textLight transition hover:text-amazon-textDark"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-destructive">{error.message}</p>
      )}
    </div>
  );
};

export default Input;
