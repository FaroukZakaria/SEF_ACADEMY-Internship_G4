import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/loginSchema";
import Input from "../shared/Input";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, saveUser } from "../../utils/authService";
import { useState } from "react";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await login(data);

      saveUser(response.token, response.user.role, response.user.username, response.user.email);

      toast.success(response.message);

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href =
      "https://e-commerce-api-3wara.vercel.app/auth/google";
  };

  return (
    <div className="flex items-start justify-center p-8 md:p-16">
      <div className="w-full max-w-md">
        <img src={logo} alt="logo" className="mx-auto mb-6 h-20" />

        <h2 className="mb-2 text-center text-4xl font-bold text-amazon-textDark">
          Welcome Back
        </h2>

        <p className="mb-8 text-center text-amazon-textLight">
          Sign in to your admin dashboard
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            register={register("email")}
            error={errors.email}
            icon={<MdEmail size={20} />}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            register={register("password")}
            error={errors.password}
            icon={<RiLockPasswordFill size={20} />}
          />

          <button
            disabled={loading}
            className="mt-2 w-full rounded-xl bg-amazon-orange py-3 font-bold text-amazon-navy shadow-md transition hover:bg-amazon-orangeHover disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-amazon-border" />
          <span className="mx-4 text-sm text-amazon-textLight">OR</span>
          <div className="h-px flex-1 bg-amazon-border" />
        </div>

        <button onClick={handleGoogleLogin} className="flex w-full items-center justify-center gap-3 rounded-xl border border-amazon-border bg-amazon-surface text-amazon-textDark py-3 font-semibold hover:opacity-90 cursor-pointer">
          <FcGoogle size={22} />
          Continue with Google
        </button>

        <p className="mt-8 text-center text-sm text-amazon-textLight">
          Secure Admin Access
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
