// import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Signup from 'components/signup';
import { signIn, signOut, useSession } from 'next-auth/react';
import { trpc } from 'utils/trpc';

function SignedInPage() {
  const me = trpc.user.me.useQuery();
  return (
    <div>
      <h1>Home</h1>
      <p>
        Welcome to the home page, <strong>{me?.data?.name}</strong>!
      </p>
      <button onClick={() => signOut()}> Sign out </button>
    </div>
  );
}

export default function IndexPage() {
  const { data: session } = useSession();

  if (session && session.user) {
    return <SignedInPage />;
  }
  return (
    <>
      <Head>
        <title>Team Prediction</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen bg-ctp-base text-ctp-text shadow">
        <h1 className="w-screen from-ctp-blue to-ctp-mauve text-center font-sans text-2xl font-extrabold leading-loose tracking-wide subpixel-antialiased">
          Team Prediction
        </h1>
        <div className="flex justify-center">
          <button
            className="rounded bg-ctp-blue py-2 px-4 font-bold text-white hover:bg-ctp-mauve"
            onClick={() => signIn()}
          >
            Sign in
          </button>
          <Signup />
        </div>
      </div>
    </>
  );
}
