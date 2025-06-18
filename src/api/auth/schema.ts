import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  email: z.string().email("Invalid email format"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type TLoginRequest = z.infer<typeof loginSchema>;
export type TRegisterRequest = z.infer<typeof registerSchema>;
