import {
  filterUserLiveShares,
  marketValueDisplay,
} from 'src/common/markets/utils';
import Button from 'src/components/Button';
import { LedgerEntry, MarketWithActivity } from 'src/types/market';
import { UserUuid } from 'src/types/user';
import tw from 'tailwind-styled-components';

export default function MarketDescription({
  marketValue,
  marketData,
  ledger,
  handleBuyYes,
  handleBuyNo,
  handleSellYes,
  handleSellNo,
  mutating,
  userUuid,
}: {
  marketValue: number;
  marketData: MarketWithActivity;
  ledger: LedgerEntry[];
  handleBuyYes: () => void;
  handleBuyNo: () => void;
  handleSellYes: () => void;
  handleSellNo: () => void;
  mutating: boolean;
  userUuid: UserUuid;
}) {
  const userLiveShares = filterUserLiveShares(ledger, userUuid);
  return (
    <MarketTextContainer>
      <p className="prose text-current">{marketData.description}</p>
      <div className="flex flex-wrap">
        <span className="title-font text-2xl font-medium text-rosewater">
          {marketValueDisplay(marketValue)}
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
  );
}
const MarketTextContainer = tw.div`
mt-6 w-full lg:mt-0 
`;
