import z from "zod";

 


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
