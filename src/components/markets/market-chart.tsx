import { LedgerEntry, MarketWithActivity } from 'src/types/market';
import tw from 'tailwind-styled-components';

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
import 'chartjs-adapter-date-fns';
import { marketValueForLedger } from 'src/common/markets/utils';
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
  animation: {
    duration: 0,
  },
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
export default function MarketChart({
  marketData,
  ledger,
}: {
  marketData: MarketWithActivity;
  ledger: LedgerEntry[];
}) {
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
p-6
`;
