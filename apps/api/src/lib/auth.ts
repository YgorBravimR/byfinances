import { FastifyRequest } from 'fastify'

export async function getUserId(req: FastifyRequest) {
  const { user_id } = await req.jwtVerify<{ user_id: number }>()

  return user_id
}
