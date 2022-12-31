import { prisma } from 'server/prisma';
import { authedProcedure, router } from 'server/trpc';

export const userRouter = router({
  me: authedProcedure.query(async ({ ctx }) => {
    if (!ctx.user?.email) {
      throw new Error('no auth');
    }
    const resp = await prisma.user.findUnique({
      where: {
        email: ctx.user.email,
      },
    });
    return resp;
  }),
});
