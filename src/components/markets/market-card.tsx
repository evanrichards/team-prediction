import nullthrows from 'nullthrows';
import { useState } from 'react';
import { filterUserLiveShares, parseLedger } from 'src/common/markets/utils';
import Button from 'src/components/Button';
import { MarketAlignment, MarketWithActivity } from 'src/types/market';
import { trpc } from 'src/utils/trpc';
import tw from 'tailwind-styled-components';

export default function MarketCard({
  marketData,
}: {
  marketData: MarketWithActivity;
}) {
  const userQuery = trpc.user.me.useQuery();
  const [ledger, setLedger] = useState(marketData.marketLedger);
  const buyMutation = trpc.market.buySharesInMarket.useMutation({
    onSuccess: (data) => {
      setLedger(data);
    },
  });
  const sellMutation = trpc.market.sellSharesInMarket.useMutation({
    onSuccess: (data) => {
      setLedger(data);
    },
  });
  const handleBuyYes = () => {
    buyMutation.mutate({
      marketUuid: marketData.uuid,
      shares: 1,
      alignment: MarketAlignment.enum.YES,
    });
  };
  const handleBuyNo = () => {
    buyMutation.mutate({
      marketUuid: marketData.uuid,
      shares: 1,
      alignment: MarketAlignment.enum.NO,
    });
  };
  const handleSellYes = () => {
    sellMutation.mutate({
      marketUuid: marketData.uuid,
      shares: 1,
      alignment: MarketAlignment.enum.YES,
    });
  };
  const handleSellNo = () => {
    sellMutation.mutate({
      marketUuid: marketData.uuid,
      shares: 1,
      alignment: MarketAlignment.enum.NO,
    });
  };
  const splitLedger = parseLedger(ledger);
  const marketValue =
    splitLedger.totalLiveCount > 0
      ? Math.round(
          ((splitLedger.yesBuyCount - splitLedger.yesSellCount) /
            splitLedger.totalLiveCount) *
            100,
        )
      : 50;
  if (userQuery.isLoading) {
    return <div>Loading...</div>;
  }
  if (userQuery.isError) {
    return <div>Not authenticated</div>;
  }
  const userUuid = nullthrows(userQuery.data?.uuid);
  const userLiveShares = filterUserLiveShares(ledger, userUuid);
  return (
    <MarketCardComponent>
      {marketData.question} -{` ${marketValue}%`}
      <p>{marketData.description}</p>
      <div className="flex flex-row justify-around">
        <Button onClick={handleBuyNo} disabled={buyMutation.isLoading}>
          Buy No
        </Button>
        <Button onClick={handleBuyYes} disabled={buyMutation.isLoading}>
          Buy Yes
        </Button>
        <Button
          onClick={handleSellNo}
          disabled={sellMutation.isLoading || userLiveShares.noLiveCount < 1}
        >
          Sell No
        </Button>
        <Button
          onClick={handleSellYes}
          disabled={sellMutation.isLoading || userLiveShares.yesLiveCount < 1}
        >
          Sell Yes
        </Button>
      </div>
      <ul className="list-decimal">
        {ledger.map((market) => (
          <li key={market.uuid}>
            {market.marketAlignment} - {market.transactionType}
            {market.userUuid === userUuid ? ' - You' : ''}
          </li>
        ))}
      </ul>
    </MarketCardComponent>
  );
}

const MarketCardComponent = tw.div`
  px-10
`;
