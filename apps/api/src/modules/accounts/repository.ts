import { prisma } from "src/lib/prisma"
import { CreateAccountDTO, UpdateAccountDTO } from "./models"

class AccountsRepository {
  async getAll(userId: number) {
    const res = await prisma.accounts.findMany({
      where: {
        user_id: userId,
        deleted_at: null,
      },
    })
    return res
  }

  async getOne(accountId: number) {
    const res = await prisma.accounts.findUnique({
      where: {
        account_id: accountId,
      },
    })
    return res
  }

  async create(userId: number, data: CreateAccountDTO) {
    const res = await prisma.accounts.create({
      data: {
        user_id: userId,
        name: data.name,
        description: data.description,
        bank: data.bank,
        color: data.color,
        initial_balance: data.initialBalance,
      },
    })
    return res
  }

  async update(data: UpdateAccountDTO) {
    const res = await prisma.accounts.update({
      where: {
        account_id: data.accountId,
      },
      data: {
        name: data.name,
        description: data.description,
        bank: data.bank,
        color: data.color,
        updated_at: new Date(),
      },
    })
    return res
  }
}

export { AccountsRepository }
