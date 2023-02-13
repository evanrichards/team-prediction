import { User, UserUuid } from 'src/types/user';
import { z } from 'zod';

export const LedgerUuid = z.string().uuid().brand('ledger');
export type LedgerUuid = z.infer<typeof LedgerUuid>;

export const MarketUuid = z.string().uuid().brand('market');
export type MarketUuid = z.infer<typeof MarketUuid>;

export const MarketAlignment = z.enum(['YES', 'NO']);
export type MarketAlignment = z.infer<typeof MarketAlignment>;

export const MarketResolutionAlignment = z.enum(['YES', 'NO', 'NONE']);
export type MarketResolutionAlignment = z.infer<
  typeof MarketResolutionAlignment
>;

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

export const Market = z.object({
  uuid: MarketUuid,
  question: z.string().trim().min(1, { message: 'Question is required' }),
  description: z.string().trim().min(1, { message: 'Description is required' }),
  currentValue: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  resolvedAt: z.string().datetime().optional(),
  closedAt: z.string().datetime().optional(),
  resolutionAlignment: MarketAlignment.optional(),
});
export type Market = z.infer<typeof Market>;

export const CreateMarketInput = Market.pick({
  question: true,
  description: true,
});
export type CreateMarketInput = z.infer<typeof CreateMarketInput>;

export const MarketWithActivity = Market.extend({
  createdByUser: User,
  marketLedger: z.array(LedgerEntry),
});
export type MarketWithActivity = z.infer<typeof MarketWithActivity>;

export const ResolveMarketInput = z.object({
  marketUuid: MarketUuid,
  resolutionAlignment: MarketResolutionAlignment,
});
export type ResolveMarketInput = z.infer<typeof ResolveMarketInput>;
