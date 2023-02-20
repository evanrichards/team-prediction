import {
  LedgerEntry,
  MarketAlignment,
  TransactionType,
} from 'src/types/market';
import { z } from 'zod';
import { UserUuid } from 'src/types/user';

export function parseLedger(ledger: LedgerEntry[]): {
  yesBuyCount: number;
  yesSellCount: number;
  noBuyCount: number;
  noSellCount: number;
  totalLiveCount: number;
} {
  return ledger.reduce(
    (acc, entry) => {
      if (entry.marketAlignment === MarketAlignment.enum.YES) {
        if (entry.transactionType === TransactionType.enum.BUY) {
          acc.yesBuyCount += 1;
          acc.totalLiveCount += 1;
        } else {
          acc.yesSellCount += 1;
          acc.totalLiveCount -= 1;
        }
      } else {
        if (entry.transactionType === TransactionType.enum.BUY) {
          acc.noBuyCount += 1;
          acc.totalLiveCount += 1;
        } else {
          acc.noSellCount += 1;
          acc.totalLiveCount -= 1;
        }
      }
      return acc;
    },
    {
      yesBuyCount: 0,
      yesSellCount: 0,
      noBuyCount: 0,
      noSellCount: 0,
      totalLiveCount: 0,
    },
  );
}

export function filterUserLiveShares(
  allEntries: LedgerEntry[],
  userUuid: UserUuid,
): {
  yesLiveCount: number;
  noLiveCount: number;
} {
  const userShares = allEntries.filter((share) => share.userUuid === userUuid);
  return userShares.reduce(
    (acc, entry) => {
      if (entry.marketAlignment === MarketAlignment.enum.YES) {
        if (entry.transactionType === TransactionType.enum.BUY) {
          acc.yesLiveCount += 1;
        } else {
          acc.yesLiveCount -= 1;
        }
      } else {
        if (entry.transactionType === TransactionType.enum.BUY) {
          acc.noLiveCount += 1;
        } else {
          acc.noLiveCount -= 1;
        }
      }
      return acc;
    },
    {
      yesLiveCount: 0,
      noLiveCount: 0,
    },
  );
}

export function marketValueForLedger(ledger: LedgerEntry[]): number {
  if (ledger.length === 0) {
    return 50;
  }
  const split = parseLedger(ledger);
  if (split.totalLiveCount === 0) {
    return 50;
  }
  return (
    ((split.yesBuyCount - split.yesSellCount) * 100) / split.totalLiveCount
  );
}

export function marketValueDisplay(marketValue: number): string {
  if (
    (marketValue < 100 && marketValue > 95) ||
    (marketValue > 0 && marketValue < 5)
  ) {
    return `${marketValue.toFixed(2)}%`;
  }
  return `${marketValue.toFixed(0)}%`;
}

const MarketActivityByUser = z.object({
  userUuid: UserUuid,
  firstEntry: z.date(),
  fromValue: z.number().int().min(0).max(100),
  toValue: z.number().int().min(0).max(100),
  transactionType: TransactionType,
  marketAlignment: MarketAlignment,
  count: z.number().int().min(0),
});
type MarketActivityByUser = z.infer<typeof MarketActivityByUser>;

export function marketChangesByUser(
  ledger: LedgerEntry[],
): MarketActivityByUser[] {
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
        firstEntry: new Date(entry.createdAt),
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
  return activity;
}
