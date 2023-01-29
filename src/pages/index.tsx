// import { signIn, signOut, useSession } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from 'src/components/layout';
import { trpc } from 'src/utils/trpc';

export default function IndexPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [router, status]);
  const usersQuery = trpc.user.users.useQuery();

  return (
    <Layout home>
      <p>
        Welcome to the home page, <strong>{session?.user?.name}</strong>!
      </p>
      {usersQuery.status === 'success' && (
        <div>
          Other users in your team signed up:
          <ul className="list-disc">
            {usersQuery.data?.map((user) => (
              <li key={user.uuid}>{user.name}</li>
            ))}
          </ul>
        </div>
      )}
    </Layout>
  );
}
