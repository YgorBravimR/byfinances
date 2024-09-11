import { FastifyReply, FastifyRequest } from "fastify"
import { AccountsService } from "src/modules/accounts/service"
import {
  CreateAccountDTO,
  CreateAccountSchema,
  UpdateAccountDTO,
  UpdateAccountSchema,
} from "./models"
import { z } from "zod"

const accountsService = new AccountsService()

class AccountsController {
  static async getAll(
    req: FastifyRequest<{ Params: { userId: number } }>,
    res: FastifyReply
  ) {
    const userId = req.params.userId // TODO - get userId from auth token
    const response = await accountsService.getAll(userId)

    return res.status(200).send(response)
  }

  static async getOne(
    req: FastifyRequest<{ Params: { accountId: number } }>,
    res: FastifyReply
  ) {
    const accountId = req.params.accountId
    const response = await accountsService.getOne(accountId)

    return res.status(200).send(response)
  }

  static async create(
    req: FastifyRequest<{ Body: CreateAccountDTO }>,
    res: FastifyReply
  ) {
    const validatedBody = CreateAccountSchema.parse(req.body)

    const response = await accountsService.create(validatedBody)

    return res.status(200).send(response)
  }

  static async update(
    req: FastifyRequest<{ Body: UpdateAccountDTO }>,
    res: FastifyReply
  ) {
    const validatedBody = UpdateAccountSchema.parse(req.body)

    const response = await accountsService.update(validatedBody)

    return res.status(200).send(response)
  }
}

export { AccountsController }