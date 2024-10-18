import { prisma } from "src/lib/prisma"
import { CreateAccountDTO, UpdateAccountDTO } from "./models"

class AccountsRepository {
  async getAll(userId: number) {
    return await prisma.accounts.findMany({
      where: {
        user_id: userId,
        deleted_at: null,
      },
    })
  }

  async getOne(accountId: number) {
    return await prisma.accounts.findUnique({
      where: {
        account_id: accountId,
      },
    })
  }

  async getBanks() {
    return await prisma.banks.findMany({
      where: {
        deleted_at: null,
      },
    })
  }

  async create(userId: number, data: CreateAccountDTO) {
    return await prisma.accounts.create({
      data: {
        user_id: userId,
        name: data.name,
        description: data.description,
        bank_id: Number(data.bank),
        color: data.color,
        initial_balance: data.initialBalance,
      },
    })
  }

  async update(data: UpdateAccountDTO) {
    return await prisma.accounts.update({
      where: {
        account_id: data.accountId,
      },
      data: {
        name: data.name,
        description: data.description,
        bank_id: Number(data.bank),
        color: data.color,
        updated_at: new Date(),
      },
    })
  }
}

export { AccountsRepository }
