import { signupRouter } from 'server/routers/signup';
import { userRouter } from 'server/routers/user';
import { publicProcedure, router } from 'server/trpc';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),

  signup: signupRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
