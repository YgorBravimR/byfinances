import { FastifyReply, FastifyRequest } from "fastify"
import { CreditCardsService } from "src/modules/creditCards/service"
import { CreateCreditCardDTO, CreateCreditCardSchema, UpdateCreditCardDTO, UpdateCreditCardSchema } from "./models"

const creditCardsService = new CreditCardsService()

class CreditCardsController {
  static async getAll(req: FastifyRequest<{ Params: { userId: number } }>, res: FastifyReply) {
    const userId = req.params.userId // TODO - get userId from auth token
    const response = await creditCardsService.getAll(userId)

    return res.status(200).send(response)
  }

  static async getOne(req: FastifyRequest<{ Params: { creditCardId: number } }>, res: FastifyReply) {
    const creditCardId = req.params.creditCardId
    const response = await creditCardsService.getOne(creditCardId)

    return res.status(200).send(response)
  }

  static async create(req: FastifyRequest<{ Body: CreateCreditCardDTO }>, res: FastifyReply) {
    const validatedBody = CreateCreditCardSchema.parse(req.body)

    const response = await creditCardsService.create(validatedBody)

    return res.status(200).send(response)
  }

  static async update(req: FastifyRequest<{ Body: UpdateCreditCardDTO }>, res: FastifyReply) {
    const validatedBody = UpdateCreditCardSchema.parse(req.body)

    const response = await creditCardsService.update(validatedBody)

    return res.status(200).send(response)
  }
}

export { CreditCardsController }
