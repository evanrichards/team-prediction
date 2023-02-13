import {
  filterUserLiveShares,
  marketValueForLedger,
} from 'src/common/markets/utils';
import Button from 'src/components/Button';
import { LedgerEntry, MarketWithActivity } from 'src/types/market';
import { UserUuid } from 'src/types/user';
import tw from 'tailwind-styled-components';
import 'chartjs-adapter-date-fns';

import { enUS } from 'date-fns/locale';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  TimeScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  TimeScale,
);
export const options = {
  ticks: {
    source: 'data',
  },
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'day',
      },
    },
    y: {
      min: 0,
      max: 100,
    },
  },
  // turn off legend and title:
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  adapters: {
    date: {
      locale: enUS,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
};
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
  console.log('rendering market card');
  const userLiveShares = filterUserLiveShares(ledger, userUuid);
  const marketValue = marketValueForLedger(ledger);
  const graphData = createGraphData({ ...marketData, marketLedger: ledger });
  const graphComponentInput = {
    datasets: [
      {
        fill: true,
        data: graphData,
        backgroundColor: '#A6E3A1',
        borderColor: '#40A02B',
      },
    ],
  };
  return (
    <MarketCardSection>
      <MarketCardContainer>
        <MarketCardComponent>
          <MarketGraphContainer>
            <Line
              width={400}
              height={400}
              options={{
                ...options,
                scales: {
                  ...options.scales,
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  x: {
                    ...options.scales.x,
                    min: new Date(marketData.createdAt).valueOf(),
                    max: marketData.closedAt
                      ? new Date(marketData.closedAt).valueOf()
                      : new Date().valueOf(),
                  },
                },
              }}
              data={graphComponentInput}
            />
          </MarketGraphContainer>
          <MarketTextContainer>
            <div className="flex flex-wrap">
              <MarketType>YES-OR-NO MARKET</MarketType>
              <span className="ml-auto">
                <MarketType $open={marketData.closedAt === undefined}>
                  {marketData.closedAt
                    ? `CLOSED ON ${new Date(
                        marketData.closedAt,
                      ).toDateString()}`
                    : 'OPEN'}
                </MarketType>
              </span>
            </div>
            <MarketTitle className="title-font mb-1 text-3xl font-medium text-white">
              {marketData.question}
            </MarketTitle>
            <p className="prose text-current">{marketData.description}</p>
            <div className="flex flex-wrap">
              <span className="title-font text-2xl font-medium text-white">
                {marketValue}%
              </span>
              <div className="ml-auto flex gap-4 text-white">
                <Button
                  onClick={handleBuyYes}
                  disabled={mutating || handleBuyYes === undefined}
                >
                  Buy Yes
                </Button>
                <Button
                  onClick={handleBuyNo}
                  disabled={mutating || handleBuyNo === undefined}
                >
                  Buy No
                </Button>
                <Button
                  onClick={handleSellYes}
                  disabled={
                    mutating ||
                    handleSellYes === undefined ||
                    userLiveShares.yesLiveCount < 1
                  }
                >
                  Sell Yes
                </Button>
                <Button
                  onClick={handleSellNo}
                  disabled={
                    mutating ||
                    handleSellNo === undefined ||
                    userLiveShares.noLiveCount < 1
                  }
                >
                  Sell No
                </Button>
              </div>
            </div>
          </MarketTextContainer>
        </MarketCardComponent>
      </MarketCardContainer>
    </MarketCardSection>
  );
}

function createGraphData(market: MarketWithActivity) {
  const { createdAt, closedAt, marketLedger } = market;
  if (marketLedger.length === 0) {
    return [
      { y: 50, x: new Date(createdAt).valueOf() },
      { y: 50, x: new Date().valueOf() },
    ];
  }
  // sort market ledger by date
  marketLedger.sort((a, b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });
  const data: { y: number; x: number }[] = [];
  Array(marketLedger.length)
    .fill(0)
    .forEach((_, i) => {
      const value = marketValueForLedger(marketLedger.slice(0, i + 1));
      data.push({
        y: value,
        x: new Date(marketLedger[i].createdAt).valueOf(),
      });
    });
  const currentValue = marketValueForLedger(marketLedger);
  if (closedAt) {
    data.push({
      y: currentValue,
      x: new Date(closedAt).valueOf(),
    });
  } else {
    data.push({
      y: currentValue,
      x: new Date().valueOf(),
    });
  }

  return data;
}

const MarketGraphContainer = tw.div`
border-mantle
rounded
bg-surface0
mt-6
p-6
lg:w-1/2
w-full lg:h-auto h-64 object-cover object-center
`;
const MarketTextContainer = tw.div`
mt-6 w-full lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10 flex-grow
`;

const MarketTitle = tw.h1`
title-font mb-1 text-3xl font-medium text-white
`;

const MarketType = tw.h2`
uppercase
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
