import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { createTRPCNext } from '@trpc/next';
import type { inferProcedureOutput } from '@trpc/server';
import { NextPageContext } from 'next';
import getConfig from 'next/config';
import { AppRouter } from 'src/server/routers/_app';
import superjson from 'superjson';

// ℹ️ Type-only import:
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export

const { publicRuntimeConfig, headers: configHeaders } = getConfig();

const { APP_URL } = publicRuntimeConfig;

function getEndingLink(
  ctx: NextPageContext | undefined,
  forwardHeaders: boolean,
) {
  if (!forwardHeaders) {
    // This is the frontend case. Note here that we do not add the app URL to
    // the batch link, because the frontend appends its current URL to the
    // request.
    return httpBatchLink({
      url: '/api/trpc',
      headers: configHeaders,
    });
  }
  // This is the backend case. Note here that we add the app URL to the batch
  // link to match the URL of the frontend (I think).
  return httpBatchLink({
    url: `${APP_URL}/api/trpc`,
    async headers() {
      if (ctx?.req) {
        // on ssr, forward client's headers to the server
        const { connection: _connection, ...headers } = ctx.req.headers;
        return {
          ...configHeaders,
          ...headers,
          'x-ssr': '1',
        };
      }
      return configHeaders;
    },
  });
}

/**
 * A set of strongly-typed React hooks from your `AppRouter` type signature with `createReactQueryHooks`.
 * @link https://trpc.io/docs/react#3-create-trpc-hooks
 */
export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */

    return {
      /**
       * @link https://trpc.io/docs/links
       */
      links: [
        // adds pretty logs to your console in development and logs errors in production
        loggerLink({
          enabled: (opts) =>
            (process.env.NODE_ENV === 'development' &&
              typeof window !== 'undefined') ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        getEndingLink(ctx, typeof window === 'undefined'),
      ],
      /**
       * @link https://trpc.io/docs/data-transformers
       */
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
});

// export const transformer = superjson;
/**
 * This is a helper method to infer the output of a query resolver
 * @example type HelloOutput = inferQueryOutput<'hello'>
 */
export type inferQueryOutput<
  TRouteKey extends keyof AppRouter['_def']['queries'],
> = inferProcedureOutput<AppRouter['_def']['queries'][TRouteKey]>;
