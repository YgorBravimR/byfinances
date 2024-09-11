import { ZodError } from "zod"
import { FastifyInstance } from "fastify"
import { BadRequestError, UnauthorizedError } from "./custom-errors"

type FastifyErrorHandler = FastifyInstance["errorHandler"]

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error.",
      issues: error.flatten().fieldErrors,
    })
  }

  if (error instanceof BadRequestError) {
    return reply.status(400).send({
      message: error.message,
    })
  }

  if (error instanceof UnauthorizedError) {
    return reply.status(401).send({
      message: error.message,
    })
  }

  // TODO - Send error to observability

  console.error(error)

  return reply.status(500).send({ message: "Internal server error." })
}
