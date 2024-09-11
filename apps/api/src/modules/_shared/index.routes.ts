import { FastifyInstance } from "fastify"
import { accountsRoutes } from "../accounts/routes"
import { usersRoutes } from "../users/routes"
import { creditCardsRoutes } from "../creditCards/routes"
import { transactionsRoutes } from "../transactions/routes"

export async function appRoutes(app: FastifyInstance) {
  accountsRoutes(app)
  usersRoutes(app)
  creditCardsRoutes(app)
  transactionsRoutes(app)
}
