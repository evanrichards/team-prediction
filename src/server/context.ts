import { inferAsyncReturnType } from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { getSession } from 'next-auth/react';

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = async (opts: CreateNextContextOptions) => {
  const session = await getSession(opts);

  console.log('createContext for', JSON.stringify(session));

  return {
    session: {
      ...session,
      user: {
        ...session?.user,
        uuid: '',
      },
    },
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
