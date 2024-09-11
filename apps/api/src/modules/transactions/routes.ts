import { FastifyInstance } from "fastify"
import { TransactionsController } from "./controller"

const BASE_PATH = "/transactions"

export async function transactionsRoutes(app: FastifyInstance) {
  app.get(BASE_PATH, TransactionsController.getAll)
  app.get(`${BASE_PATH}/:transactionId`, TransactionsController.getOne)

  app.post(`${BASE_PATH}/create`, TransactionsController.create)

  app.put(`${BASE_PATH}/update`, TransactionsController.update)
}
