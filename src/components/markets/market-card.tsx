import nullthrows from 'nullthrows';
import { useState } from 'react';
import { filterUserLiveShares, parseLedger } from 'src/common/markets/utils';
import { LedgerEntry, MarketAlignment, MarketUuid } from 'src/types/market';
import { trpc } from 'src/utils/trpc';
import tw from 'tailwind-styled-components';

export default function MarketCard({
  marketUuid,
  marketDataProps,
}: {
  marketUuid: MarketUuid;
  marketDataProps: LedgerEntry[];
}) {
  const userQuery = trpc.user.me.useQuery();
  const [state, setState] = useState(marketDataProps);
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
      marketUuid,
      shares: 1,
      alignment: MarketAlignment.enum.YES,
    });
  };
  const handleBuyNo = () => {
    buyMutation.mutate({
      marketUuid,
      shares: 1,
      alignment: MarketAlignment.enum.NO,
    });
  };
  const handleSellYes = () => {
    sellMutation.mutate({
      marketUuid,
      shares: 1,
      alignment: MarketAlignment.enum.YES,
    });
  };
  const handleSellNo = () => {
    sellMutation.mutate({
      marketUuid,
      shares: 1,
      alignment: MarketAlignment.enum.NO,
    });
  };
  const splitLedger = parseLedger(state);
  const marketValue = Math.round(
    ((splitLedger.yesBuyCount - splitLedger.yesSellCount) /
      splitLedger.totalLiveCount) *
      100,
  );
  if (userQuery.isLoading) {
    return <div>Loading...</div>;
  }
  if (userQuery.isError) {
    return <div>Not authenticated</div>;
  }
  const userUuid = nullthrows(userQuery.data?.uuid);
  const userLiveShares = filterUserLiveShares(state, userUuid);
  return (
    <MarketCardComponent>
      Will users be able to create their own markets by Feb 14th? -
      {` ${marketValue}%`}
      <div>
        <MarketCardButton
          onClick={handleBuyNo}
          disabled={buyMutation.isLoading}
        >
          Buy No
        </MarketCardButton>
        <MarketCardButton
          onClick={handleBuyYes}
          disabled={buyMutation.isLoading}
        >
          Buy Yes
        </MarketCardButton>
        <MarketCardButton
          onClick={handleSellNo}
          disabled={sellMutation.isLoading || userLiveShares.noLiveCount < 1}
        >
          Sell No
        </MarketCardButton>
        <MarketCardButton
          onClick={handleSellYes}
          disabled={sellMutation.isLoading || userLiveShares.yesLiveCount < 1}
        >
          Sell Yes
        </MarketCardButton>
      </div>
      <ul className="list-decimal">
        {state.map((market) => (
          <li key={market.uuid}>
            {market.marketAlignment} - {market.transactionType}
          </li>
        ))}
      </ul>
    </MarketCardComponent>
  );
}

const MarketCardComponent = tw.div`
  px-10
`;

const MarketCardButton = tw.button`
  bg-blue-500
  hover:bg-blue-700
  text-white
  font-bold
  py-2
  px-4
  rounded
  m-2
`;
