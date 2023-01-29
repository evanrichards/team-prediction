import { prisma } from 'src/server/prisma';
import { authedProcedure, router } from 'src/server/trpc';

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
