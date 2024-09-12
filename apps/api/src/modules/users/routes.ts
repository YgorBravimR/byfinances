import { FastifyInstance } from 'fastify'
import { UsersController } from './controller'
import { authMiddleware } from '@/http/middlewares/auth'

const BASE_PATH = '/users'

// TODO - Study ZodTypeProvider method
// TODO - Study and implement swagger documentation

export async function usersRoutes(app: FastifyInstance) {
  app.register(authMiddleware).get(`${BASE_PATH}`, UsersController.getAll)
  app.register(authMiddleware).get(`${BASE_PATH}/profile`, UsersController.getProfile)
  app.register(authMiddleware).get(`${BASE_PATH}/:userId`, UsersController.getById)

  app.post(`${BASE_PATH}/sign-up`, UsersController.create)
  app.post(`${BASE_PATH}/sign-in`, UsersController.signIn)

  app.register(authMiddleware).put(`${BASE_PATH}/update`, UsersController.update)
}
