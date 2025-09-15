import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .refine((val) => /^\S+@\S+\.\S+$/.test(val), {
      message: "Invalid email format",
    }),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z.object({
  // name: z
  //   .string()
  //   .nonempty("Name is required")
  //   .min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .nonempty("Email is required")
    .refine((val) => /^\S+@\S+\.\S+$/.test(val), {
      message: "Invalid email format",
    }),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export const userSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .refine((val) => /^\S+@\S+\.\S+$/.test(val), {
      message: "Invalid email format",
    }),
  password: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 8, {
      message: "Password must be at least 8 characters",
    }),
});
