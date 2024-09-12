import { BadRequestError } from '@/http/custom-errors'
import { FastifyRequest } from 'fastify'

export async function getUserId(req: FastifyRequest) {
  const { user_id } = await req.jwtVerify<{
    iat: number
    exp: number
    user_id: number
  }>()

  if (!user_id) {
    throw new BadRequestError('User not found')
  }

  return user_id
}
