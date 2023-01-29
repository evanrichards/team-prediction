import { GetStaticPropsResult } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import Layout from 'src/components/layout';
import { Context } from 'src/server/context';
import { MarketService } from 'src/server/markets/markets.service';
import { LedgerEntry, MarketAlignment, MarketUuid } from 'src/types/market';
import { trpc } from 'src/utils/trpc';
import { NIL as NIL_UUID } from 'uuid';

const ONE_MARKET = MarketUuid.parse(NIL_UUID);

export const getServerSideProps = async (
  ctx: Context,
): Promise<
  GetStaticPropsResult<{ initMarketData: LedgerEntry[] } | undefined>
> => {
  const marketData = await new MarketService().getActivityForMarket(
    ctx,
    ONE_MARKET,
  );
  return {
    props: { initMarketData: marketData },
  };
};

export default function MarketPage({
  initMarketData,
}: {
  initMarketData: LedgerEntry[];
}) {
  const usersQuery = trpc.user.users.useQuery();
  const [state, setState] = useState(initMarketData);
  const buyMutation = trpc.market.buySharesInMarket.useMutation({
    onSuccess: (data) => {
      setState(data);
    },
  });
  const sellMutation = trpc.market.sellSharesInMarket.useMutation({
    onSuccess: (data) => {
      setState(data);
    },
  });
  const handleBuyYes = () => {
    buyMutation.mutate({
      marketUuid: ONE_MARKET,
      shares: 1,
      alignment: MarketAlignment.enum.YES,
    });
  };
  const handleBuyNo = () => {
    buyMutation.mutate({
      marketUuid: ONE_MARKET,
      shares: 1,
      alignment: MarketAlignment.enum.NO,
    });
  };
  const handleSellYes = () => {
    sellMutation.mutate({
      marketUuid: ONE_MARKET,
      shares: 1,
      alignment: MarketAlignment.enum.YES,
    });
  };
  const handleSellNo = () => {
    sellMutation.mutate({
      marketUuid: ONE_MARKET,
      shares: 1,
      alignment: MarketAlignment.enum.NO,
    });
  };
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
      <div>
        Will users be able to create their own markets by Feb 14th?
        <ul className="list-decimal">
          {state.map((market) => (
            <li key={market.uuid}>
              {market.marketAlignment} - {market.transactionType}
            </li>
          ))}
        </ul>
        <button onClick={handleBuyNo} disabled={buyMutation.isLoading}>
          Buy No
        </button>
        <button onClick={handleBuyYes} disabled={buyMutation.isLoading}>
          Buy Yes
        </button>
        <button onClick={handleSellNo} disabled={sellMutation.isLoading}>
          Sell No
        </button>
        <button onClick={handleSellYes} disabled={sellMutation.isLoading}>
          Sell Yes
        </button>
      </div>
    </Layout>
  );
}
