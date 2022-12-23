import { router, publicProcedure } from '../trpc';
import { signupRouter } from './signup';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),

  signup: signupRouter,
});

export type AppRouter = typeof appRouter;
