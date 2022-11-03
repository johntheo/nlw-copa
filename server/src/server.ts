import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt"
import { poolRoutes } from "./routes/poll";
import { userRoutes } from "./routes/user";
import { guessRoutes } from "./routes/guess";
import { gameRoutes } from "./routes/game";
import { authRoutes } from "./routes/auth";

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  await fastify.register(jwt, {
    secret: 'nlwcopa', //in production need to be a env variable
  })

  await fastify.register(authRoutes);
  await fastify.register(poolRoutes);
  await fastify.register(userRoutes);
  await fastify.register(guessRoutes);
  await fastify.register(gameRoutes);

  await fastify.listen({ port: 3333, host: "0.0.0.0" });
}

bootstrap();
