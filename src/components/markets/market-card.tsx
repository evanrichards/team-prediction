import { marketValueForLedger } from 'src/common/markets/utils';
import { LedgerEntry, MarketWithActivity } from 'src/types/market';
import { UserUuid } from 'src/types/user';
import tw from 'tailwind-styled-components';
import { Tab } from '@headlessui/react';

import MarketDescription from 'src/components/markets/market-description';
import MarketChart from 'src/components/markets/market-chart';
import { useState } from 'react';
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
  const [categories] = useState({
    'Market Description': (
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
    ),
  });
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
          <div className="flex flex-wrap ">
            <div className="w-full pr-1 md:w-1/2">
              <MarketChart marketData={marketData} ledger={ledger} />
            </div>
            <div className="w-full pl-1 md:w-1/2">
              <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl p-1">
                  {Object.keys(categories).map((category) => (
                    <Tab
                      key={category}
                      className={({ selected }) =>
                        'w-full rounded-lg bg-overlay0 py-2.5 text-sm font-medium leading-5' +
                        ' focus:outline-none focus:ring-2' +
                        (selected
                          ? ' bg-overlay2 text-mantle ring-2 ring-text'
                          : '')
                      }
                    >
                      {category}
                    </Tab>
                  ))}
                </Tab.List>
                <Tab.Panels className="mt-2">
                  {Object.values(categories).map((component, idx) => (
                    <Tab.Panel
                      key={idx}
                      className={
                        'rounded-xl bg-base p-3 focus:outline-none focus:ring-2'
                      }
                    >
                      {component}
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>
            </div>
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
`;
