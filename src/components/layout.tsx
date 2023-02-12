import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import { Heading2XL } from 'src/components/heading';
import Navbar from 'src/components/navbar';
import { ThemeContext } from 'src/context/theme-context';
import tw from 'tailwind-styled-components';

const SITE_TITLE = 'Team Prediction';
export default function Layout({
  children,
  pageTitle,
}: {
  children: React.ReactNode;
  pageTitle?: string;
}) {
  // Because our theme is set in a cookie, and we are using SSR for the first
  // render, we need to force a rerender to get the correct theme, or else the
  // server will think there is a mismatch between the server and client.
  // The tiny flicker on every page load is the cost of not putting in @dark on
  // every single element in the app.
  const { currentTheme } = useContext(ThemeContext);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    // This forces a rerender, so the date is rendered
    // the second time but not the first
    setHydrated(true);
  }, []);
  return (
    <>
      <Head>
        <title>{`${SITE_TITLE} ${pageTitle}`}</title>
      </Head>
      <div className={hydrated ? currentTheme : 'macchiato'}>
        <Navbar />
        <LayoutDiv>
          {pageTitle && (
            <Header>
              <Heading2XL>{pageTitle}</Heading2XL>
            </Header>
          )}
          <main>{children}</main>
        </LayoutDiv>
      </div>
    </>
  );
}

const Header = tw.header`
flex
flex-col
justify-between
items-center
`;

const LayoutDiv = tw.div`
bg-base
container
mx-auto
max-w-36rem
py-0
px-4
mt-12
mb-24
`;
