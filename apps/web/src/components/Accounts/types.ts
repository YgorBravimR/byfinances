import { z } from 'zod'

export interface IAccount {
  account_id: number
  user_id: number
  name: string
  description: string | null
  bank: string
  color: string
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
}

export const CreateAccountSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  bank: z.string().min(1, 'Bank is required'),
  color: z.string().min(1, 'Color is required'),
  initialBalance: z.union([z.number(), z.string()]).optional(),
})

export type CreateAccountDTO = z.infer<typeof CreateAccountSchema>

export interface IBank {
  bank_id: number
  name: string
  uid: string
  color: string
  deleted_at: Date | null
}
