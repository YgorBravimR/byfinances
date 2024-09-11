import { CreditCardsRepository } from "src/modules/creditCards/repository"
import { CreateCreditCardDTO, UpdateCreditCardDTO } from "./models"

const creditCardsRepository = new CreditCardsRepository()

class CreditCardsService {
  async getAll(userId: number) {
    const res = await creditCardsRepository.getAll(userId)
    return res
  }

  async getOne(creditCardId: number) {
    const res = await creditCardsRepository.getOne(creditCardId)
    return res
  }

  async create(data: CreateCreditCardDTO) {
    const res = await creditCardsRepository.create(data)
    return res
  }

  async update(data: UpdateCreditCardDTO) {
    const res = await creditCardsRepository.update(data)
    return res
  }
}

export { CreditCardsService }
