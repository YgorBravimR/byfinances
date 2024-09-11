import { TransactionsRepository } from "src/modules/transactions/repository"
import { CreateTransactionDTO, UpdateTransactionDTO } from "./models"

const transactionsRepository = new TransactionsRepository()

class TransactionsService {
  async getAll(userId: number) {
    const res = await transactionsRepository.getAll(userId)
    return res
  }

  async getOne(transactionId: number) {
    const res = await transactionsRepository.getOne(transactionId)
    return res
  }

  async create(data: CreateTransactionDTO) {
    const res = await transactionsRepository.create(data)
    return res
  }

  async update(data: UpdateTransactionDTO) {
    const res = await transactionsRepository.update(data)
    return res
  }
}

export { TransactionsService }
