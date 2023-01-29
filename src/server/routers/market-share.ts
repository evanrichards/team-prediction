import { authedProcedure, router } from 'src/server/trpc';
import z from 'zod';

export const marketShareRouter = router({
  sharesForMarket: authedProcedure
    .input(
      z.object({
        marketUuid: z.string().uuid(),
      }),
    )
    .query(async ({ ctx }) => {
      if (!ctx.user?.email) {
        throw new Error('no auth');
      }
      return [];
    }),
});
