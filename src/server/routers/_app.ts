import { marketRouter } from 'src/server/markets/market.router';
import { userRouter } from 'src/server/routers/user';
import { publicProcedure, router } from 'src/server/trpc';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),
  market: marketRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
