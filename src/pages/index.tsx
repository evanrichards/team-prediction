// import { signIn, signOut, useSession } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from 'src/components/layout';

export default function IndexPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [router, status]);

  return (
    <Layout home>
      <p>
        Welcome to the home page, <strong>{session?.user?.name}</strong>!
      </p>
    </Layout>
  );
}
