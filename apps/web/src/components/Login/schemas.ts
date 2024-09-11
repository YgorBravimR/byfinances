import { z } from "zod"

export const SignInSchema = z.object({
  email: z.string(),
  password: z.string().min(6),
})

export type SignInFormSchema = z.infer<typeof SignInSchema>

export const SignUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  confirmPassword: z.string().min(8, "Confirm Password must be at least 8 characters long").optional(),
})

export type SignUpFormSchema = z.infer<typeof SignUpSchema>
