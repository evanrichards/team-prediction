import { inferAsyncReturnType } from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { UserService } from 'src/server/users/user.service';
import { Email } from 'src/types/user';

const userService = new UserService();

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = async (opts: CreateNextContextOptions) => {
  const session = await getSession(opts);
  const user = await getUserFromSession(session);

  return {
    session,
    user,
  };
};

async function getUserFromSession(session?: Session | null) {
  if (!session?.user?.email) {
    return null;
  }
  return userService.getCurrentUser(Email.parse(session.user.email));
}

export type Context = inferAsyncReturnType<typeof createContext>;
