import { z } from "zod"

export const CreateCreditCardSchema = z.object({
  accountId: z.number(),
  name: z.string(),
  brand: z.string(),
  description: z.string().optional(),
  closingDay: z.number(),
})

export type CreateCreditCardDTO = z.infer<typeof CreateCreditCardSchema>

export const UpdateCreditCardSchema = z.object({
  creditCardId: z.number(),
  accountId: z.number().optional(),
  name: z.string().optional(),
  brand: z.string().optional(),
  description: z.string().optional(),
  closingDay: z.number().optional(),
})

export type UpdateCreditCardDTO = z.infer<typeof UpdateCreditCardSchema>
