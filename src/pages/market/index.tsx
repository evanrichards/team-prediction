import { GetStaticPropsResult } from 'next';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from 'src/components/layout';
import MarketCard from 'src/components/markets/market-card';
import { Context } from 'src/server/context';
import { MarketService } from 'src/server/markets/markets.service';
import { LedgerEntry, MarketUuid } from 'src/types/market';
import { trpc } from 'src/utils/trpc';
import { NIL as NIL_UUID } from 'uuid';

const ONE_MARKET = MarketUuid.parse(NIL_UUID);

export const getServerSideProps = async (
  ctx: Context,
): Promise<
  GetStaticPropsResult<
    | {
        marketDataProps: LedgerEntry[];
      }
    | undefined
  >
> => {
  const marketService = new MarketService();
  const marketDataProps = await marketService.getActivityForMarket(
    ctx,
    ONE_MARKET,
  );

  return {
    props: { marketDataProps },
  };
};

export default function MarketPage({
  marketDataProps,
}: {
  marketDataProps: LedgerEntry[];
}) {
  const session = useSession();
  const router = useRouter();
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
      <MarketCard marketUuid={ONE_MARKET} marketDataProps={marketDataProps} />
    </Layout>
  );
}
