import { marketValueForLedger } from 'src/common/markets/utils';
import { LedgerEntry, MarketWithActivity } from 'src/types/market';
import { UserUuid } from 'src/types/user';
import tw from 'tailwind-styled-components';

import MarketDescription from 'src/components/markets/market-description';
import MarketChart from 'src/components/markets/market-chart';
export default function MarketCard({
  handleBuyYes,
  handleBuyNo,
  handleSellYes,
  handleSellNo,
  marketData,
  ledger,
  mutating,
  userUuid,
}: {
  handleBuyYes: () => void;
  handleBuyNo: () => void;
  handleSellYes: () => void;
  handleSellNo: () => void;
  marketData: MarketWithActivity;
  ledger: LedgerEntry[];
  mutating: boolean;
  userUuid: UserUuid;
}) {
  const marketValue = marketValueForLedger(ledger);
  return (
    <MarketCardSection>
      <MarketCardContainer>
        <MarketCardComponent>
          <>
            <div className="flex w-full">
              <MarketType>YES-OR-NO MARKET</MarketType>
              <div className="flex-auto" />
              <div className="flex-none">
                <MarketType $open={marketData.closedAt === undefined}>
                  {marketData.closedAt
                    ? `CLOSED ON ${new Date(
                        marketData.closedAt,
                      ).toDateString()}`
                    : 'OPEN'}
                </MarketType>
              </div>
            </div>
            <MarketTitle className="title-font mb-1 text-3xl font-medium text-rosewater">
              {marketData.question}
            </MarketTitle>
          </>
          <div className="h-64 w-full object-cover object-center lg:h-auto lg:w-1/2 ">
            <MarketChart marketData={marketData} ledger={ledger} />
          </div>
          <div
            className="h-64 w-full object-cover object-center lg:h-auto lg:w-1/2
          "
          >
            <MarketDescription
              marketValue={marketValue}
              marketData={marketData}
              ledger={ledger}
              handleBuyYes={handleBuyYes}
              handleBuyNo={handleBuyNo}
              handleSellYes={handleSellYes}
              handleSellNo={handleSellNo}
              mutating={mutating}
              userUuid={userUuid}
            />
          </div>
        </MarketCardComponent>
      </MarketCardContainer>
    </MarketCardSection>
  );
}

const MarketTitle = tw.h1`
title-font mb-1 text-3xl font-medium text-white
`;

const MarketType = tw.h2`
uppercase
flex-none
${(p: { $open?: boolean }) =>
  p.$open === true
    ? 'text-green'
    : p.$open === false
    ? 'text-maroon'
    : 'text-gray'}
title-font text-sm tracking-widest
`;

const MarketCardSection = tw.section`
body-font
overflow-hidden
bg-base
text-text
`;

const MarketCardContainer = tw.div`
container
mx-auto
px-5
py-5
mx-auto
`;

const MarketCardComponent = tw.div`
flex
flex-wrap
lg:w-4/5
`;
