import { inferAsyncReturnType } from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { prisma } from 'server/prisma';

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = async (opts: CreateNextContextOptions) => {
  const session = await getSession(opts);
  const userUuid = await getUserUuidFromSession(session);

  return {
    session,
    user: {
      email: session?.user?.email,
      name: session?.user?.name,
      uuid: userUuid,
      signedIn: !!userUuid,
    },
  };
};

async function getUserUuidFromSession(session?: Session | null) {
  if (!session?.user?.email) {
    return null;
  }
  const userUuid = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  return userUuid;
}

export type Context = inferAsyncReturnType<typeof createContext>;
