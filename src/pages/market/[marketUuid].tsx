import { useRouter } from 'next/router';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import Layout from 'src/components/layout';
import MarketAdminCard from 'src/components/markets/market-admin-card';
import MarketCard from 'src/components/markets/market-card';
import {
  MarketAlignment,
  MarketResolutionAlignment,
  MarketUuid,
} from 'src/types/market';
import { trpc } from 'src/utils/trpc';
import { Message } from 'src/types/message';
import Messenger from 'src/components/Messenger';

export default function MarketPage() {
  const router = useRouter();
  const { marketUuid: marketUuidString } = router.query;
  const marketUuid = MarketUuid.parse(marketUuidString);
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
  const closeMarketMutation = trpc.market.closeMarket.useMutation({
    onSuccess: () => {
      setMutating(false);
      marketQuery.refetch();
    },
  });
  const resolveMarketMutation = trpc.market.resolveMarket.useMutation({
    onSuccess: () => {
      setMutating(false);
      marketQuery.refetch();
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
  const handleCloseMarket = () => {
    setMutating(true);
    closeMarketMutation.mutate(marketUuid);
  };
  const handleResolveMarket = (
    resolutionAlignment: MarketResolutionAlignment,
  ) => {
    setMutating(true);
    resolveMarketMutation.mutate({
      marketUuid,
      resolutionAlignment,
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
        marketUuid={marketUuid}
      />
      {userQuery.data?.uuid === marketQuery.data?.createdByUser.uuid && (
        <MarketAdminCard
          handleResolveMarket={handleResolveMarket}
          handleCloseMarket={handleCloseMarket}
          marketIsClosed={marketQuery.data?.closedAt !== undefined}
          marketIsResolved={marketQuery.data?.resolvedAt !== undefined}
        />
      )}
    </Layout>
  );
}
