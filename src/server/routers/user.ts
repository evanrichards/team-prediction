import { prisma } from 'src/server/prisma';
import { authedProcedure, router } from 'src/server/trpc';
import { UserService } from 'src/server/users/user.service';

const userService = new UserService();

export const userRouter = router({
  me: authedProcedure.query(async ({ ctx }) => {
    if (!ctx.user?.email) {
      throw new Error('no auth');
    }
    const resp = await userService.getCurrentUser(ctx.user.email);
    return resp;
  }),
  users: authedProcedure.query(async ({ ctx }) => {
    const userEmail = ctx.session?.user?.email;
    if (!userEmail) {
      throw new Error('no auth');
    }
    const domain = userEmail.split('@')[1];
    const resp = await prisma.user.findMany({
      where: {
        email: {
          endsWith: domain,
        },
      },
    });
    return resp;
  }),
});
