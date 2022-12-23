// import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Signup from 'components/signup';

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>Team Prediction</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="shadow h-screen bg-ctp-base text-ctp-pink">
        <h1 className="w-screen font-sans text-2xl subpixel-antialiased font-extrabold tracking-wide leading-loose text-center from-ctp-blue to-ctp-mauve">
          Team Prediction
        </h1>
        <div className="flex justify-center">
          <Signup />
        </div>
      </div>
    </>
  );
}

/**
 * If you want to statically render this page
 * - Export `appRouter` & `createContext` from [trpc].ts
 * - Make the `opts` object optional on `createContext()`
 *
 * @link https://trpc.io/docs/ssg
 */
// export const getStaticProps = async (
//   context: GetStaticPropsContext<{ filter: string }>,
// ) => {
//   const ssg = createSSGHelpers({
//     router: appRouter,
//     ctx: await createContext(),
//   });
//
//   await ssg.fetchQuery('post.all');
//
//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       filter: context.params?.filter ?? 'all',
//     },
//     revalidate: 1,
//   };
// };
