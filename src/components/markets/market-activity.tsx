import {
  marketChangesByUser,
  marketValueDisplay,
} from 'src/common/markets/utils';
import { LedgerEntry } from 'src/types/market';
import { UserUuid } from 'src/types/user';

export default function MarketActivity({
  ledger,
  userUuid,
}: {
  ledger: LedgerEntry[];
  userUuid: UserUuid;
}) {
  const activity = marketChangesByUser(ledger);
  return (
    <div className="flex w-full flex-col lg:mt-0">
      <p className="w-full">There have been {activity.length} transactions.</p>
      <ul>
        {activity.map((entry, i) => (
          <li key={`${i}`}>{`${entry.userUuid === userUuid ? 'You: ' : ''} ${
            entry.transactionType
          } ${entry.count} ${entry.marketAlignment} from ${marketValueDisplay(
            entry.fromValue,
          )} to ${marketValueDisplay(entry.toValue)}`}</li>
        ))}
      </ul>
    </div>
  );
}
