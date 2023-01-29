import Image from 'next/image';
import Layout from 'src/components/layout';
import { trpc } from 'src/utils/trpc';

export default function MarketPage() {
  const usersQuery = trpc.user.users.useQuery();
  return (
    <Layout pageTitle="Markets">
      <h1>The Market Page</h1>
      <p>Here is where you will be able to see all the markets</p>
      <Image priority src="/icon.png" alt="Logo" width={200} height={200} />
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
