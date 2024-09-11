import { z } from "zod"

export const CreateTransactionSchema = z.object({
  accountId: z.number(),
  creditCardId: z.number().optional(),
  transferToAccountId: z.number().optional(),
  type: z.enum(["income", "expense", "transfer", "creditCard"]),
  amount: z.number(),
  isCompleted: z.boolean().optional(),
  transactionDate: z.date(),
  description: z.string().optional(),
  tagIds: z.array(z.number()).optional(),
  observations: z.string().optional(),
  isFixed: z.boolean().optional(),
  repeatQuantity: z.number().optional(),
  repeatUnit: z.enum(["day", "week", "month", "year"]).optional(),
  position: z.number().optional(),
})

export type CreateTransactionDTO = z.infer<typeof CreateTransactionSchema>

export const UpdateTransactionSchema = z.object({
  transactionId: z.number(),
  accountId: z.number().optional(),
  creditCardId: z.number().optional(),
  transferToAccountId: z.number().optional(),
  amount: z.number().optional(),
  isCompleted: z.boolean().optional(),
  transactionDate: z.date().optional(),
  description: z.string().optional(),
  tagIds: z.array(z.number()).optional(),
  observations: z.string().optional(),
  repeatQuantity: z.number().optional(),
  repeatUnit: z.enum(["day", "week", "month", "year"]).optional(),
})

export type UpdateTransactionDTO = z.infer<typeof UpdateTransactionSchema>
