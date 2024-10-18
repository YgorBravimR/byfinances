import { FastifyReply, FastifyRequest } from "fastify"
import { AccountsService } from "src/modules/accounts/service"
import { CreateAccountDTO, CreateAccountSchema, UpdateAccountDTO, UpdateAccountSchema } from './models'
import { getUserId } from '@/lib/auth'

const accountsService = new AccountsService()

class AccountsController {
  static async getAll(req: FastifyRequest<{ Params: { userId: number } }>, res: FastifyReply) {
    const userId = await getUserId(req)

    const response = await accountsService.getAll(userId)

    return res.status(200).send(response)
  }

  static async getOne(req: FastifyRequest<{ Params: { accountId: number } }>, res: FastifyReply) {
    const accountId = req.params.accountId
    const response = await accountsService.getOne(accountId)

    return res.status(200).send(response)
  }

  static async getBanks(req: FastifyRequest, res: FastifyReply) {
    const response = await accountsService.getBanks()

    return res.status(200).send(response)
  }

  static async create(req: FastifyRequest<{ Body: CreateAccountDTO }>, res: FastifyReply) {
    const userId = await getUserId(req)

    const validatedBody = CreateAccountSchema.parse(req.body)

    const response = await accountsService.create(userId, validatedBody)

    return res.status(200).send(response)
  }

  static async update(req: FastifyRequest<{ Body: UpdateAccountDTO }>, res: FastifyReply) {
    const validatedBody = UpdateAccountSchema.parse(req.body)

    const response = await accountsService.update(validatedBody)

    return res.status(200).send(response)
  }
}

export { AccountsController }
