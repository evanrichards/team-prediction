import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Button from 'src/components/Button';
import { HeadingMd } from 'src/components/heading';
import Layout from 'src/components/layout';
import { Link } from 'src/components/Link';
import { trpc } from 'src/utils/trpc';
import tw from 'tailwind-styled-components';

export default function MarketPage() {
  const session = useSession();
  const router = useRouter();
  const markets = trpc.market.list.useQuery();
  useEffect(() => {
    if (session.status === 'unauthenticated') {
      router.push('/unauthorized');
    }
  }, [router, session.status]);

  const usersQuery = trpc.user.users.useQuery();
  if (session.status !== 'authenticated') {
    return <div>Loading...</div>;
  }

  return (
    <Layout pageTitle="Markets">
      <div className="flex flex-row justify-center">
        <Button href="/market/new">Create new market</Button>
      </div>
      <MarketsContainer>
        <div className="m-4">
          {usersQuery.isSuccess && (
            <div>
              Other users in your team signed up:
              <ul className="list-disc">
                {usersQuery.data?.map((user) => (
                  <li key={user.uuid}>{user.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {markets.isSuccess && (
          <div className="m-4">
            <HeadingMd>{"Your team's markets"}</HeadingMd>
            <ul className="list-disc">
              {markets.data.map((market) => (
                <li key={market.uuid}>
                  <Link href={`/market/${market.uuid}`}>{market.question}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </MarketsContainer>
    </Layout>
  );
}

const MarketsContainer = tw.div`
  flex
  flex-row
  flex-wrap
  justify-center
`;
