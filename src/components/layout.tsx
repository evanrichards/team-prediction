import Head from 'next/head';
import { Heading2XL } from 'src/components/heading';
import Navbar from 'src/components/navbar';
import tw from 'tailwind-styled-components';

const SITE_TITLE = 'Team Prediction';
export default function Layout({
  children,
  pageTitle,
}: {
  children: React.ReactNode;
  pageTitle: string;
}) {
  return (
    <LayoutDiv>
      <Head>
        <meta name="description" content="A prediction market tool for teams" />
        <link rel="icon" href="/favicon.ico" />
        <title>{`${SITE_TITLE} ${pageTitle}`}</title>
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            SITE_TITLE,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={SITE_TITLE} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Navbar />
      <Header>
        <Heading2XL>{pageTitle}</Heading2XL>
      </Header>
      <main>{children}</main>
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
