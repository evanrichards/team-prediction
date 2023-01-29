import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import tw from 'tailwind-styled-components';

const SITE_TITLE = 'Team Prediction';
export default function Layout({
  children,
  home = false,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  const { data: session } = useSession();
  return (
    <LayoutDiv>
      <Head>
        <meta name="description" content="A prediction market tool for teams" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            SITE_TITLE,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={SITE_TITLE} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Header>{home ? <>Home</> : <>Market</>}</Header>
      <main>{children}</main>
      {!home && (
        <div>
          Return to <Link href="/">Home</Link>
        </div>
      )}
      {session && session.user && (
        <button onClick={() => signOut()}> Sign out </button>
      )}
    </LayoutDiv>
  );
}

const Header = tw.header`

flex
flex-col
justify-between
items-center

`;

const LayoutDiv = tw.div`
max-w-36rem
py-0
px-4
mx-auto
mt-12
mb-24
`;
