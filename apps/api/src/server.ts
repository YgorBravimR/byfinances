import cors from "@fastify/cors";
import fastify from "fastify";
import { env } from "./config/env"
import { appRoutes } from "./modules/_shared/index.routes"
import fastifyJWT from "@fastify/jwt"
import { errorHandler } from "./http/error-handler"

const app = fastify()
const port = env.PORT

app.register(fastifyJWT, {
  secret: "my-jwt-secret",
})
app.register(appRoutes)
app.register(cors)
app.setErrorHandler(errorHandler)

app
  .listen({
    port,
    host: "RENDER" in process.env ? "0.0.0.0" : "localhost",
  })
  .then(() => {
    console.log(`HTTP server running on port ${port}`);
  });
