import z from "zod";

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