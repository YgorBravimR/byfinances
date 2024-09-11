import { prisma } from "src/lib/prisma"
import { CreateCreditCardDTO, UpdateCreditCardDTO } from "./models"

class CreditCardsRepository {
  async getAll(userId: number) {
    const res = await prisma.credit_cards.findMany({
      where: {
        accounts: {
          user_id: userId,
          deleted_at: null,
        },
        deleted_at: null,
      },
    })
    return res
  }

  async getOne(creditCardId: number) {
    const res = await prisma.credit_cards.findUnique({
      where: {
        credit_card_id: creditCardId,
      },
    })
    return res
  }

  async create(data: CreateCreditCardDTO) {
    const res = await prisma.credit_cards.create({
      data: {
        account_id: data.accountId,
        name: data.name,
        brand: data.brand,
        description: data.description,
        closing_day: data.closingDay,
      },
    })
    return res
  }

  async update(data: UpdateCreditCardDTO) {
    const res = await prisma.credit_cards.update({
      where: {
        credit_card_id: data.creditCardId,
      },
      data: {
        account_id: data.accountId,
        name: data.name,
        brand: data.brand,
        description: data.description,
        closing_day: data.closingDay,
        updated_at: new Date(),
      },
    })
    return res
  }
}

export { CreditCardsRepository }
