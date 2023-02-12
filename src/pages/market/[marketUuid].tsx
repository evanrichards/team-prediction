import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from 'src/components/layout';
import MarketAdminCard from 'src/components/markets/market-admin-card';
import MarketCard from 'src/components/markets/market-card';
import { MarketAlignment, MarketUuid } from 'src/types/market';
import { trpc } from 'src/utils/trpc';

export default function MarketPage() {
  const router = useRouter();
  const { marketUuid: marketUuidString } = router.query;
  const marketUuid = MarketUuid.parse(marketUuidString);
  console.log('fetching market', marketUuid);
  const marketQuery = trpc.market.get.useQuery(marketUuid);
  const userQuery = trpc.user.me.useQuery();
  const [ledger, setLedger] = useState(marketQuery.data?.marketLedger ?? []);
  useEffect(() => {
    setLedger(marketQuery.data?.marketLedger ?? []);
  }, [marketQuery.data?.marketLedger]);
  const [mutating, setMutating] = useState(false);
  const buyMutation = trpc.market.buySharesInMarket.useMutation({
    onSuccess: (data) => {
      setLedger(data);
      setMutating(false);
    },
  });
  const sellMutation = trpc.market.sellSharesInMarket.useMutation({
    onSuccess: (data) => {
      setLedger(data);
      setMutating(false);
    },
  });
  const handleBuyYes = () => {
    setMutating(true);
    buyMutation.mutate({
      marketUuid: marketUuid,
      shares: 1,
      alignment: MarketAlignment.enum.YES,
    });
  };
  const handleBuyNo = () => {
    setMutating(true);
    buyMutation.mutate({
      marketUuid: marketUuid,
      shares: 1,
      alignment: MarketAlignment.enum.NO,
    });
  };
  const handleSellYes = () => {
    setMutating(true);
    sellMutation.mutate({
      marketUuid: marketUuid,
      shares: 1,
      alignment: MarketAlignment.enum.YES,
    });
  };
  const handleSellNo = () => {
    setMutating(true);
    sellMutation.mutate({
      marketUuid: marketUuid,
      shares: 1,
      alignment: MarketAlignment.enum.NO,
    });
  };
  if (
    marketQuery.status !== 'success' ||
    marketQuery.data == null ||
    userQuery.data == null
  ) {
    return <div>Loading...</div>;
  }
  return (
    <Layout>
      <MarketCard
        handleBuyYes={handleBuyYes}
        handleBuyNo={handleBuyNo}
        handleSellYes={handleSellYes}
        handleSellNo={handleSellNo}
        marketData={marketQuery.data}
        ledger={ledger}
        mutating={mutating}
        userUuid={userQuery.data?.uuid}
      />
      {userQuery.data !== undefined &&
        marketQuery.data !== undefined &&
        userQuery.data?.uuid === marketQuery.data?.createdByUser.uuid && (
          <MarketAdminCard
            handleResolveMarket={() => {
              console.log('resolve market');
            }}
            handleCloseMarket={() => {
              console.log('close market');
            }}
          />
        )}
    </Layout>
  );
}
