import { FastifyInstance } from "fastify"
import { UnauthorizedError } from "../custom-errors"
import fastifyPlugin from "fastify-plugin"

export const authMiddleware = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook("preHandler", async (request) => {
    request.getCurrentUserId = async () => {
      try {
        const { user_id } = await request.jwtVerify<{ user_id: number }>()
        return user_id
      } catch {
        throw new UnauthorizedError("Invalid auth token.")
      }
    }
  })
})
