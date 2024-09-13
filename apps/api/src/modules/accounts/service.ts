import { AccountsRepository } from "src/modules/accounts/repository"
import { CreateAccountDTO, UpdateAccountDTO } from "./models"

const accountsRepository = new AccountsRepository()

class AccountsService {
  async getAll(userId: number) {
    const res = await accountsRepository.getAll(userId)
    return res
  }

  async getOne(accountId: number) {
    const res = await accountsRepository.getOne(accountId)
    return res
  }

  async create(userId: number, data: CreateAccountDTO) {
    const res = await accountsRepository.create(userId, data)
    return res
  }

  async update(data: UpdateAccountDTO) {
    const res = await accountsRepository.update(data)
    return res
  }
}

export { AccountsService }
