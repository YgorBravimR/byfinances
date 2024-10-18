import { FastifyInstance } from "fastify"
import { AccountsController } from "./controller"
import { authMiddleware } from '@/http/middlewares/auth'

const BASE_PATH = '/accounts'

export async function accountsRoutes(app: FastifyInstance) {
  app.register(authMiddleware).get(`${BASE_PATH}`, AccountsController.getAll)
  app.register(authMiddleware).get(`${BASE_PATH}/banks`, AccountsController.getBanks)
  app.register(authMiddleware).get(`${BASE_PATH}/:accountId`, AccountsController.getOne)

  app.register(authMiddleware).post(`${BASE_PATH}/create`, AccountsController.create)

  app.register(authMiddleware).put(`${BASE_PATH}/update`, AccountsController.update)
}
