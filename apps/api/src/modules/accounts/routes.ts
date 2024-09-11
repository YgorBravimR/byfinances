import { FastifyInstance } from "fastify"
import { AccountsController } from "./controller"

const BASE_PATH = "/accounts"

export async function accountsRoutes(app: FastifyInstance) {
  app.get(`${BASE_PATH}`, AccountsController.getAll)
  app.get(`${BASE_PATH}/:accountId`, AccountsController.getOne)

  app.post(`${BASE_PATH}/create`, AccountsController.create)

  app.put(`${BASE_PATH}/update`, AccountsController.update)
}
