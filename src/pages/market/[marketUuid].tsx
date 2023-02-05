import { useRouter } from 'next/router';
import Layout from 'src/components/layout';
import MarketCard from 'src/components/markets/market-card';
import { MarketUuid } from 'src/types/market';
import { trpc } from 'src/utils/trpc';

export default function MarketPage() {
  const router = useRouter();
  const { marketUuid: marketUuidString } = router.query;
  const marketUuid = MarketUuid.parse(marketUuidString);
  const marketQuery = trpc.market.get.useQuery(marketUuid);
  if (marketQuery.status !== 'success' || marketQuery.data === null) {
    return <div>Loading...</div>;
  }
  return (
    <Layout pageTitle={marketQuery.data?.question}>
      <MarketCard marketData={marketQuery.data} />
    </Layout>
  );
}
