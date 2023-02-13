import { MarketService } from 'src/server/markets/markets.service';
import { authedProcedure, router } from 'src/server/trpc';
import {
  BuySharesInMarketInput,
  CreateMarketInput,
  LedgerEntry,
  Market,
  MarketUuid,
  MarketWithActivity,
  SellSharesInMarketInput,
} from 'src/types/market';
import { z } from 'zod';

const marketService = new MarketService();

export const marketRouter = router({
  get: authedProcedure
    .input(MarketUuid)
    .output(MarketWithActivity)
    .query(async ({ ctx, input }) => marketService.get(ctx, input)),
  create: authedProcedure
    .input(CreateMarketInput)
    .output(MarketUuid)
    .mutation(async ({ ctx, input }) => marketService.create(ctx, input)),
  list: authedProcedure
    .output(Market.array())
    .query(async ({ ctx }) => marketService.list(ctx)),
  marketActivity: authedProcedure
    .input(MarketUuid)
    .output(LedgerEntry.array())
    .query(async ({ ctx, input }) =>
      marketService.getActivityForMarket(ctx, input),
    ),
  currentMarketValue: authedProcedure
    .input(MarketUuid)
    .output(z.number())
    .query(async ({ ctx, input }) =>
      marketService.getCurrentMarketValue(ctx, input),
    ),
  buySharesInMarket: authedProcedure
    .input(BuySharesInMarketInput)
    .output(LedgerEntry.array())
    .mutation(async ({ ctx, input }) =>
      marketService.buySharesInMarket(ctx, input),
    ),
  sellSharesInMarket: authedProcedure
    .input(SellSharesInMarketInput)
    .output(LedgerEntry.array())
    .mutation(async ({ ctx, input }) =>
      marketService.sellSharesInMarket(ctx, input),
    ),
  closeMarket: authedProcedure
    .input(MarketUuid)
    .mutation(async ({ ctx, input }) => marketService.closeMarket(ctx, input)),
});
