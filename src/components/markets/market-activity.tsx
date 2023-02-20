import {
  marketValueDisplay,
  marketValueForLedger,
} from 'src/common/markets/utils';
import {
  LedgerEntry,
  MarketAlignment,
  TransactionType,
} from 'src/types/market';
import { UserUuid } from 'src/types/user';
import { z } from 'zod';

const MarketActivityByUser = z.object({
  userUuid: z.string().uuid(),
  fromValue: z.number().int().min(0).max(100),
  toValue: z.number().int().min(0).max(100),
  transactionType: TransactionType,
  marketAlignment: MarketAlignment,
  count: z.number().int().min(0),
});
type MarketActivityByUser = z.infer<typeof MarketActivityByUser>;

export default function MarketActivity({
  ledger,
  userUuid,
}: {
  ledger: LedgerEntry[];
  userUuid: UserUuid;
}) {
  ledger.sort((a, b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });
  const activity: MarketActivityByUser[] = [];
  ledger.forEach((entry, i) => {
    const previousUser = activity[activity.length - 1]?.userUuid;
    const previousAction = activity[activity.length - 1]?.transactionType;
    const previousAlignment = activity[activity.length - 1]?.marketAlignment;

    if (
      previousUser !== entry.userUuid ||
      previousAction !== entry.transactionType ||
      previousAlignment !== entry.marketAlignment
    ) {
      activity.push({
        userUuid: entry.userUuid,
        fromValue: activity[activity.length - 1]?.toValue || 50,
        toValue: activity[activity.length - 1]?.toValue || 50,
        transactionType: entry.transactionType,
        marketAlignment: entry.marketAlignment,
        count: 0,
      });
    }
    const value = marketValueForLedger(ledger.slice(0, i + 1));
    activity[activity.length - 1].toValue = value;
    activity[activity.length - 1].count += 1;
  });
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
