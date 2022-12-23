import { prisma } from 'server/prisma';
import { authedProcedure, router } from 'server/trpc';
import { z } from 'zod';

export const UserSignInInput = z.object({
  email: z.string().email(),
  name: z.string(),
});
export type UserSignInInput = z.infer<typeof UserSignInInput>;

export const userRouter = router({
  me: authedProcedure.query(async ({ ctx }) => {
    if (!ctx.user.email) {
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
