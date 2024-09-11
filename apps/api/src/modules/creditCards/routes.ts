import { FastifyInstance } from "fastify"
import { CreditCardsController } from "./controller"

const BASE_PATH = "/creditCards"

export async function creditCardsRoutes(app: FastifyInstance) {
  app.get(BASE_PATH, CreditCardsController.getAll)
  app.get(`${BASE_PATH}/:creditCardId`, CreditCardsController.getOne)

  app.post(`${BASE_PATH}/create`, CreditCardsController.create)

  app.put(`${BASE_PATH}/update`, CreditCardsController.update)
}
