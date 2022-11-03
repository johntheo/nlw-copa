import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { authenticate } from "../plugins/authenticate";
import { z } from "zod";

export async function guessRoutes(fastify: FastifyInstance) {
  fastify.get("/guesses/count", async () => {
    const count = await prisma.guess.count();

    return { count: count };
  });

  fastify.post(
    "/polls/:pollId/games/:gameId/guesses",
    { onRequest: [authenticate] },
    async (request, reply) => {
      const createGuessParams = z.object({
        pollId: z.string(),
        gameId: z.string(),
      });
      const { pollId, gameId } = createGuessParams.parse(request.params);

      const creatGuessBody = z.object({
        firstTeamPoints: z.number(),
        secondTeamPoints: z.number(),
      });
      const { firstTeamPoints, secondTeamPoints } = creatGuessBody.parse(
        request.body
      );


      const participant = await prisma.participant.findUnique({
        where:{
            userId_pollId:{
                pollId,
                userId: request.user.sub
            }
        }
      })
      
      if(!participant){
        return reply.status(400).send({
            message: "You're not allowed to create a guess inside this poll, because you're not a Participant"
        })
      }

      const guess = await prisma.guess.findUnique({
        where:{
            participantId_gameId:{
                participantId: participant.id,
                gameId
            }
        }
      })

      if(guess){
        return reply.status(400).send({
            message: "You already sent a guess to this game on this poll"
        });
      }

      const game = await prisma.game.findUnique({
        where:{
            id: gameId
        }
      })

      if(!game){
        return reply.status(400).send({
            message: "Game not found."
        })
      }

      if (game.date < new Date()){
        return reply.status(400).send({
            message: "You cannot send guesses after game starts"
        })
      }

      await prisma.guess.create({
        data:{
            gameId,
            participantId: participant.id,
            firstTeamPoints,
            secondTeamPoints
        }
      })


      return reply.status(201).send()
    }
  );
}
