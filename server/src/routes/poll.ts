import { FastifyInstance } from "fastify";
import ShortUniqueId from "short-unique-id";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function poolRoutes(fastify: FastifyInstance) {
  fastify.get("/polls/count", async () => {
    const count = await prisma.poll.count();

    return { count: count };
  });

  fastify.post("/poll", async (request, reply) => {
    const createPollBody = z.object({
      title: z.string(), //treating null parameters
    });

    const { title } = createPollBody.parse(request.body);

    const generate = new ShortUniqueId({ length: 6 });
    const code = String(generate()).toUpperCase();

    let ownerId = null;

    try{
        await request.jwtVerify();
        await prisma.poll.create({
            data: {
              title,
              code,
              ownerId: request.user.sub
            },
          });
    }catch {
        await prisma.poll.create({
            data: {
              title,
              code,
            },
          });
    }
    

    return reply.status(201).send({ code });
  });
}
