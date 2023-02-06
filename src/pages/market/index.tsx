import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Button from 'src/components/Button';
import { HeadingMd } from 'src/components/heading';
import Layout from 'src/components/layout';
import { Link } from 'src/components/Link';
import { Market } from 'src/types/market';
import { User } from 'src/types/user';
import { trpc } from 'src/utils/trpc';
import tw from 'tailwind-styled-components';

function UlLoading() {
  return (
    <UlLoadingStyled className="list-disc">
      {Array.from({ length: 5 }).map((_, i) => (
        <li key={i} className={'my-1 min-w-full rounded-lg bg-overlay0'}></li>
      ))}
    </UlLoadingStyled>
  );
}

const UlLoadingStyled = tw.ul`
animate-pulse
list-disc
`;

function UsersContainer({ users }: { users?: User[] }) {
  return (
    <div>
      <HeadingMd>{"Your team's users"}</HeadingMd>
      {users === undefined ? (
        <UlLoading />
      ) : (
        <ul className="list-disc">
          {users.map((user) => (
            <li key={user.uuid} className={'my-1'}>
              {user.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function MarketsListContainer({ markets }: { markets: Market[] | undefined }) {
  return (
    <div>
      <HeadingMd>{"Your team's markets"}</HeadingMd>
      {markets === undefined ? (
        <UlLoading />
      ) : (
        <ul className="list-disc">
          {markets.map((market) => (
            <li key={market.uuid} className={'my-1'}>
              <Link href={`/market/${market.uuid}`}>{market.question}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
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
        <UsersContainer users={usersQuery.data} />
        <MarketsListContainer markets={markets.data} />
      </MarketsContainer>
    </Layout>
  );
}

const MarketsContainer = tw.div`
  flex
  flex-row
  flex-wrap
  justify-center
  justify-evenly
`;
