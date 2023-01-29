import { marketShareRouter } from 'src/server/routers/market-share';
import { userRouter } from 'src/server/routers/user';
import { publicProcedure, router } from 'src/server/trpc';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),
  market: marketShareRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
