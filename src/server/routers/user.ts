import nullthrows from 'nullthrows';
import { authedProcedure, router } from 'src/server/trpc';
import { UserService } from 'src/server/users/user.service';
import { User } from 'src/types/user';

const userService = new UserService();

export const userRouter = router({
  me: authedProcedure
    .output(User)
    .query(async ({ ctx }) =>
      userService.getCurrentUser(nullthrows(ctx.user?.email)),
    ),
  users: authedProcedure
    .output(User.array())
    .query(async ({ ctx }) => userService.list(ctx)),
});
