import { prisma } from "src/lib/prisma"
import { CreateUserDTO, SignInUserDTO, UpdateUserDTO } from "./models"

class UsersRepository {
  async getAll() {
    const res = await prisma.users.findMany({
      where: {
        deleted_at: null,
      },
    })
    return res
  }

  async getById(userId: number) {
    const res = await prisma.users.findUnique({
      where: {
        user_id: userId,
      },
    })
    return res
  }

  async getByEmail(email: string) {
    const res = await prisma.users.findUnique({
      where: {
        email,
      },
    })
    return res
  }

  async create(data: CreateUserDTO) {
    const res = await prisma.users.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      select: {
        user_id: true,
        name: true,
        email: true,
        created_at: true,
      },
    })
    return res
  }

  async update(data: UpdateUserDTO) {
    const res = await prisma.users.update({
      where: {
        user_id: data.userId,
      },
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        updated_at: new Date(),
      },
      select: {
        user_id: true,
        name: true,
        email: true,
        created_at: true,
      },
    })
    return res
  }

  async signIn(data: SignInUserDTO) {
    const res = await prisma.users.findUnique({
      where: {
        email: data.email,
      },
      select: {
        user_id: true,
        name: true,
        email: true,
        created_at: true,
        password: true,
      },
    })
    return res
  }
}

export { UsersRepository }
