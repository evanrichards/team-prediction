import Button from 'src/components/Button';
import tw from 'tailwind-styled-components';

export default function MarketAdminCard({
  handleResolveMarket,
  handleCloseMarket,
}: {
  handleResolveMarket: () => void;
  handleCloseMarket: () => void;
}) {
  return (
    <MarketAdminContainer>
      <h2>Admin Actions</h2>
      <div className="ml-auto">
        <div className="flex flex-wrap gap-4">
          <Button disabled={true} flavor="danger" onClick={handleCloseMarket}>
            Close Market
          </Button>
          <Button disabled={true} flavor="danger" onClick={handleResolveMarket}>
            Resolve Market
          </Button>
        </div>
      </div>
    </MarketAdminContainer>
  );
}

const MarketAdminContainer = tw.div`
flex flex-wrap gap-4
`;
