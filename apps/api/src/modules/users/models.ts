import { z } from "zod"

export const CreateUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
})

export type CreateUserDTO = z.infer<typeof CreateUserSchema>

export const UpdateUserSchema = z.object({
  userId: z.number(),
  email: z.string().optional(),
  password: z.string().optional(),
  name: z.string().optional(),
})

export type UpdateUserDTO = z.infer<typeof UpdateUserSchema>

export const SignInUserSchema = z.object({
  email: z.string(),
  password: z.string(),
})

export type SignInUserDTO = z.infer<typeof SignInUserSchema>

export const GenerateTokenSchema = z.object({
  user_id: z.number(),
  name: z.string(),
  email: z.string().email(),
})

export type GenerateTokenDTO = z.infer<typeof GenerateTokenSchema>
