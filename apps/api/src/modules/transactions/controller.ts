import { FastifyReply, FastifyRequest } from "fastify"
import { TransactionsService } from "src/modules/transactions/service"
import { CreateTransactionDTO, CreateTransactionSchema, UpdateTransactionDTO, UpdateTransactionSchema } from "./models"

const transactionsService = new TransactionsService()

class TransactionsController {
  static async getAll(req: FastifyRequest<{ Params: { userId: number } }>, res: FastifyReply) {
    const userId = req.params.userId // TODO - get userId from auth token
    const response = await transactionsService.getAll(userId)

    return res.status(200).send(response)
  }

  static async getOne(req: FastifyRequest<{ Params: { transactionId: number } }>, res: FastifyReply) {
    const transactionId = req.params.transactionId
    const response = await transactionsService.getOne(transactionId)

    return res.status(200).send(response)
  }

  static async create(req: FastifyRequest<{ Body: CreateTransactionDTO }>, res: FastifyReply) {
    const validatedBody = CreateTransactionSchema.parse(req.body)

    const response = await transactionsService.create(validatedBody)

    return res.status(200).send(response)
  }

  static async update(req: FastifyRequest<{ Body: UpdateTransactionDTO }>, res: FastifyReply) {
    const validatedBody = UpdateTransactionSchema.parse(req.body)

    const response = await transactionsService.update(validatedBody)

    return res.status(200).send(response)
  }
}

export { TransactionsController }
