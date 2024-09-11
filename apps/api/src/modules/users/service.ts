import { compare, hash } from "bcryptjs"
import { UsersRepository } from "src/modules/users/repository"
import { BadRequestError } from "./../../http/custom-errors"
import { CreateUserDTO, SignInUserDTO, UpdateUserDTO } from "./models"

const usersRepository = new UsersRepository()

class UsersService {
  async getAll() {
    const res = await usersRepository.getAll()
    return res
  }

  async getById(userId: number) {
    const res = await usersRepository.getById(userId)
    return res
  }

  async create(data: CreateUserDTO) {
    const { email, name, password } = data
    const hasUser = await usersRepository.getByEmail(email)

    if (hasUser) {
      throw new BadRequestError("User with this email already exists.")
    }

    const passwordHash = await hash(password, 6)

    const res = await usersRepository.create({ email, name, password: passwordHash })

    if (!res) {
      throw new Error("Error creating user")
    }

    return res
  }

  async update(data: UpdateUserDTO) {
    const res = await usersRepository.update(data)
    return res
  }

  async signIn(data: SignInUserDTO) {
    const res = await usersRepository.signIn(data)

    if (!res) {
      throw new BadRequestError("User not found")
    }

    const isValidPassword = await compare(data.password, res.password)

    if (!isValidPassword) {
      throw new BadRequestError("Invalid password")
    }

    const { name, email, user_id } = res

    return { name, email, user_id }
  }
}

export { UsersService }
