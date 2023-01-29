import { UserUuid } from 'src/types/user';
import { z } from 'zod';

export const LedgerUuid = z.string().uuid().brand('ledger');
export type LedgerUuid = z.infer<typeof LedgerUuid>;

export const MarketUuid = z.string().uuid().brand('market');
export type MarketUuid = z.infer<typeof MarketUuid>;

export const MarketAlignment = z.enum(['YES', 'NO']);
export type MarketAlignment = z.infer<typeof MarketAlignment>;

export const BuySharesInMarketInput = z.object({
  alignment: MarketAlignment,
  marketUuid: MarketUuid,
  shares: z.number().min(1),
});
export type BuySharesInMarketInput = z.infer<typeof BuySharesInMarketInput>;

export const SellSharesInMarketInput = z.object({
  alignment: MarketAlignment,
  marketUuid: MarketUuid,
  shares: z.number().min(1),
});
export type SellSharesInMarketInput = z.infer<typeof SellSharesInMarketInput>;

export const TransactionType = z.enum(['BUY', 'SELL']);
export type TransactionType = z.infer<typeof TransactionType>;

export const LedgerEntry = z.object({
  uuid: LedgerUuid,
  marketAlignment: MarketAlignment,
  marketUuid: MarketUuid,
  transactionType: TransactionType,
  userUuid: UserUuid,
  createdAt: z.string().datetime(),
});
export type LedgerEntry = z.infer<typeof LedgerEntry>;
