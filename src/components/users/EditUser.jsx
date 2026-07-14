import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import api from "../../api/axios";
import { editUserSchema } from "../../schemas/editUserSchema";
import Input from "../shared/Input";

const EditUser = ({ isOpen, onClose, user, onSuccess }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      username: "",
      phone: "",
      avatar: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        username: user.username || "",
        phone: user.phone || "",
        avatar: user.avatar || "",
      });
    }
  }, [user, reset]);

  if (!isOpen) return null;

  const onSubmit = async (values) => {
    try {
      const { data } = await api.patch(`/users/${user._id}`, values);

      toast.success(data.message);

      onSuccess(data.user);

      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update user.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-[92%] max-w-lg rounded-2xl bg-amazon-surface shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-2xl font-semibold text-amazon-textDark">
            Edit User
          </h2>

          <button
            onClick={onClose}
            className="text-amazon-textLight hover:text-amazon-textDark"
          >
            <IoClose size={28} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-6">
          <Input
            label="Username"
            placeholder="Enter username"
            register={register("username")}
            error={errors.username}
            className="px-0"
          />

          <Input
            label="Phone"
            placeholder="Enter phone"
            register={register("phone")}
            error={errors.phone}
            className="px-0"
          />

          <Input
            label="Avatar URL"
            placeholder="https://..."
            register={register("avatar")}
            error={errors.avatar}
            className="px-0"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-amazon-orange py-3 font-semibold text-amazon-navy transition hover:bg-amazon-orangeHover disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
