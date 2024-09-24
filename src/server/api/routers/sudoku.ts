import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { puzzles } from "~/server/db/schema";
import { generatePuzzle } from "~/server/utils/sudokuGenerator";

export const sudokuRouter = createTRPCRouter({
  generatePuzzle: publicProcedure.mutation(async ({ ctx }) => {
    const { puzzle, solution } = generatePuzzle();

    const puzzleId = await ctx.db.insert(puzzles).values({
      puzzle: JSON.stringify(puzzle),
      solution: JSON.stringify(solution),
    });
    return {
      id: puzzleId,
      puzzle,
      solution,
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

