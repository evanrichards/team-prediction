import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { Heading2XL } from 'src/components/heading';
import tw from 'tailwind-styled-components';

const SITE_TITLE = 'Team Prediction';
const NO_HOME_ROUTES = ['Markets', 'Team Prediction'];
export default function Layout({
  children,
  pageTitle,
}: {
  children: React.ReactNode;
  pageTitle: string;
}) {
  const { data: session } = useSession();
  return (
    <LayoutDiv>
      <Head>
        <meta name="description" content="A prediction market tool for teams" />
        <link rel="icon" href="/favicon.ico" />
        <title>{pageTitle}</title>
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            SITE_TITLE,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={SITE_TITLE} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Header>
        <Heading2XL>{pageTitle}</Heading2XL>
      </Header>
      <main>{children}</main>
      {!NO_HOME_ROUTES.includes(pageTitle) && (
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
