// import { signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Signup from 'components/signup';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function IndexPage() {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div>
        <Head>
          <title>Home</title>
        </Head>
        <h1>Home</h1>
        <p>
          Welcome to the home page, <strong>{session.user.email}</strong>!
        </p>
        <button onClick={() => signOut()}> Sign out </button>
      </div>
    );
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
