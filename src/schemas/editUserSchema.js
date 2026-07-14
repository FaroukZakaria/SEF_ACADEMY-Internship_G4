import { z } from "zod";

export const editUserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  phone: z.string().optional(),
  avatar: z.string().url("Please enter a valid image URL").optional(),
});

export default editUserSchema;
