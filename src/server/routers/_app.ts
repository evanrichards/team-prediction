import { marketRouter } from 'src/server/markets/market.router';
import { userRouter } from 'src/server/routers/user';
import { publicProcedure, router } from 'src/server/trpc';
import { messageRouter } from 'src/server/routers/message';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),
  market: marketRouter,
  user: userRouter,
  message: messageRouter,
});

export type AppRouter = typeof appRouter;
