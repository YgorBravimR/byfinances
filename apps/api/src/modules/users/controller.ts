import { FastifyReply, FastifyRequest } from "fastify"
import { UsersService } from "src/modules/users/service"
import { v4 as uuidV4 } from "uuid"
import {
  CreateUserDTO,
  CreateUserSchema,
  GenerateTokenDTO,
  SignInUserDTO,
  SignInUserSchema,
  UpdateUserDTO,
  UpdateUserSchema,
} from "./models"

const usersService = new UsersService()

class UsersController {
  private static async generateToken(res: FastifyReply, data: GenerateTokenDTO) {
    const token = await res.jwtSign(data, {
      sign: { expiresIn: "1d" },
    })

    return token
  }

  static async getAll(req: FastifyRequest, res: FastifyReply) {
    const response = await usersService.getAll()

    return res.status(200).send(response)
  }

  static async getById(req: FastifyRequest<{ Params: { userId: number } }>, res: FastifyReply) {
    const userId = req.params.userId
    const response = await usersService.getById(userId)

    return res.status(200).send(response)
  }

  static async create(req: FastifyRequest<{ Body: CreateUserDTO }>, res: FastifyReply) {
    const validatedBody = CreateUserSchema.parse(req.body)
    const response = await usersService.create(validatedBody)

    const token = await UsersController.generateToken(res, response)

    return res.status(201).send({ access_token: token })
  }

  static async update(req: FastifyRequest<{ Body: UpdateUserDTO }>, res: FastifyReply) {
    const validatedBody = UpdateUserSchema.parse(req.body)

    const response = await usersService.update(validatedBody)

    return res.status(200).send(response)
  }

  static async signIn(req: FastifyRequest<{ Body: SignInUserDTO }>, res: FastifyReply) {
    const validatedBody = SignInUserSchema.parse(req.body)

    const response = await usersService.signIn(validatedBody)

    const token = await UsersController.generateToken(res, response)

    return res.status(200).send({ access_token: token })
  }
}

export { UsersController }
