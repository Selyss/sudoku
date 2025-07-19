import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { puzzles } from "~/server/db/schema";
import { generatePuzzle, type Difficulty } from "~/server/utils/sudokuGenerator";

export const sudokuRouter = createTRPCRouter({
  generatePuzzle: publicProcedure
    .input(z.object({
      difficulty: z.enum(['easy', 'medium', 'hard']).default('easy')
    }).optional())
    .mutation(async ({ ctx, input }) => {
      const difficulty = input?.difficulty ?? 'easy';
      const { puzzle, solution } = generatePuzzle(difficulty);

      const puzzleId = await ctx.db.insert(puzzles).values({
        puzzle: JSON.stringify(puzzle),
        solution: JSON.stringify(solution),
      });
      return {
        id: puzzleId,
        puzzle,
        solution,
        difficulty,
      };
    }),
  
  getPuzzle: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async({ ctx, input }) => {
      return await ctx.db.query.puzzles.findFirst({
        where: eq(puzzles.id, input.id),
      });
    }),
});

