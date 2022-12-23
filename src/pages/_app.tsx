import '../styles/global.css';
import type { Session } from 'next-auth';
import { getSession, SessionProvider } from 'next-auth/react';
import type { AppType } from 'next/app';
import { trpc } from 'utils/trpc';

import { Analytics } from '@vercel/analytics/react';
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
      <Analytics />
    </>
  );
};

MyApp.getInitialProps = async ({ ctx }) => {
  return {
    session: await getSession(ctx),
    ssr: true,
  };
};

export default trpc.withTRPC(MyApp);
