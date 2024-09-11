import { prisma } from "src/lib/prisma"
import { CreateTransactionDTO, UpdateTransactionDTO } from "./models"

class TransactionsRepository {
  async getAll(userId: number) {
    const res = await prisma.transactions.findMany({
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

  async getOne(transactionId: number) {
    const res = await prisma.transactions.findUnique({
      where: {
        transaction_id: transactionId,
      },
    })
    return res
  }

  async create(data: CreateTransactionDTO) {
    const res = await prisma.transactions.create({
      data: {
        account_id: data.accountId,
        credit_card_id: data.creditCardId,
        transfer_to_account_id: data.transferToAccountId,
        type: data.type,
        amount: data.amount,
        is_completed: data.isCompleted,
        transaction_date: data.transactionDate,
        description: data.description,
        observations: data.observations,
        is_fixed: data.isFixed,
        repeat_quantity: data.repeatQuantity,
        repeat_unit: data.repeatUnit,
        position: data.position,
      },
    })
    return res
  }

  async update(data: UpdateTransactionDTO) {
    const res = await prisma.transactions.update({
      where: {
        transaction_id: data.transactionId,
      },
      data: {
        transaction_id: data.transactionId,
        account_id: data.accountId,
        credit_card_id: data.creditCardId,
        transfer_to_account_id: data.transferToAccountId,
        amount: data.amount,
        is_completed: data.isCompleted,
        transaction_date: data.transactionDate,
        description: data.description,
        tag_ids: data.tagIds,
        observations: data.observations,
        repeat_quantity: data.repeatQuantity,
        repeat_unit: data.repeatUnit,
        updated_at: new Date(),
      },
    })
    return res
  }
}

export { TransactionsRepository }
