
import { useState } from "react";
import { IoPersonAddOutline, IoClose, IoReloadOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import api from "../../api/axios";

export default function CreateUserForm({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const getToastTheme = () =>
    document.documentElement.classList.contains("dark") ? "dark" : "light";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setFormData({ username: "", email: "", password: "", phone: "" });
  };

  const handleCreate = async () => {
    if (!formData.username || !formData.email || !formData.password) {
      toast.error("Username, Email and Password are required.", {
        theme: getToastTheme(),
      });
      return;
    }

    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(formData.username.trim())) {
      toast.error(
        "Username must be 3-20 characters (letters, numbers, underscore only).",
        { theme: getToastTheme() }
      );
      return;
    }

    // Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      toast.error("Please enter a valid email address.", {
        theme: getToastTheme(),
      });
      return;
    }

    // Password length
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.", {
        theme: getToastTheme(),
      });
      return;
    }

    // Phone:
    const phoneRegex = /^\+?[0-9]{7,15}$/;
    if (formData.phone.trim() && !phoneRegex.test(formData.phone.trim())) {
      toast.error("Please enter a valid phone number (digits only).", {
        theme: getToastTheme(),
      });
      return;
    }

    setSubmitting(true);

    try {
      const res = await api.post("/users/add", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      });

      toast.success(res.data.message || "User created successfully.", {
        theme: getToastTheme(),
      });
      handleClear();
      onSuccess?.(res.data.user);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong. Please try again.",
        { theme: getToastTheme() }
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="rounded-3xl border border-amazon-border bg-amazon-surface p-6 shadow-lg transition-colors"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-amazon-orange p-3 text-white shrink-0">
            <IoPersonAddOutline className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-amazon-textDark">
              Create New User
            </h3>
            <p className="text-sm text-amazon-textLight">
              Fill in the details below to add a new user
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          aria-label="Close"
          className="rounded-xl p-2 text-amazon-textLight hover:bg-amazon-bg transition"
        >
          <IoClose className="h-5 w-5" />
        </button>
      </div>

      {/* Fields */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Field
          label="Username"
          required
          name="username"
          placeholder="e.g. john_doe"
          value={formData.username}
          onChange={handleChange}
        />
        <Field
          label="Email"
          required
          name="email"
          type="email"
          placeholder="e.g. john@email.com"
          value={formData.email}
          onChange={handleChange}
        />
        <Field
          label="Password"
          required
          name="password"
          type="password"
          placeholder="Min. 6 characters"
          value={formData.password}
          onChange={handleChange}
        />
        <Field
          label="Phone"
          name="phone"
          placeholder="e.g. +1 234 567 890"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      {/* Footer */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-amazon-textLight">
          <span className="text-red-500">*</span> Required fields
        </p>

        <div className="flex gap-3">
          <button
            onClick={handleClear}
            disabled={submitting}
            className="rounded-2xl border border-amazon-border px-5 py-2.5 font-semibold text-amazon-textDark hover:bg-amazon-bg transition disabled:opacity-50"
          >
            Clear
          </button>
          <button
            onClick={handleCreate}
            disabled={submitting}
            className="flex items-center gap-2 rounded-2xl bg-amazon-orange px-5 py-2.5
                       font-semibold text-white shadow-md transition
                       hover:bg-amazon-orangeHover active:scale-95 disabled:opacity-60 disabled:active:scale-100"
          >
            {submitting ? (
              <IoReloadOutline className="h-4 w-4 animate-spin" />
            ) : (
              <IoPersonAddOutline className="h-4 w-4" />
            )}
            {submitting ? "Creating..." : "Create User"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, required, ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold uppercase tracking-[0.15em] text-amazon-textLight">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...props}
        className="w-full rounded-2xl border border-amazon-border bg-amazon-bg px-4 py-3
                   text-amazon-textDark outline-none focus:ring-2 focus:ring-amazon-orange
                   placeholder:text-amazon-textLight/70"
      />
    </div>
  );
}
