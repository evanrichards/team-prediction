import 'src/styles/global.css';
import type { Session } from 'next-auth';
import { getSession, SessionProvider } from 'next-auth/react';
import type { AppType } from 'next/app';

import { Analytics } from '@vercel/analytics/react';
import { trpc } from 'src/utils/trpc';
import { ThemeProvider } from 'src/context/theme-context';
import { CookiesProvider } from 'react-cookie';
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <CookiesProvider>
        <SessionProvider session={session}>
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        </SessionProvider>
      </CookiesProvider>
      <Analytics />
    </>
  );
};

MyApp.getInitialProps = async ({ ctx }) => {
  return {
    session: await getSession(ctx),
  };
};

export default trpc.withTRPC(MyApp);
