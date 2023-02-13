import {
  LedgerEntry,
  MarketAlignment,
  TransactionType,
} from 'src/types/market';
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
