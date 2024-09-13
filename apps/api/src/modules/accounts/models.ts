import { z } from "zod"

export const CreateAccountSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  bank: z.string().min(1, 'Bank is required'),
  color: z.string().min(1, 'Color is required'),
  initialBalance: z.number().optional(),
})

export type CreateAccountDTO = z.infer<typeof CreateAccountSchema>

export const UpdateAccountSchema = z.object({
  accountId: z.number(),
  name: z.string().optional(),
  description: z.string().optional(),
  bank: z.string().optional(),
  color: z.string().optional(),
})

export type UpdateAccountDTO = z.infer<typeof UpdateAccountSchema>
