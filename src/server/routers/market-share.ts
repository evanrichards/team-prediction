import { MarketService } from 'src/server/markets/markets.service';
import { authedProcedure, router } from 'src/server/trpc';
import {
  BuySharesInMarketInput,
  LedgerEntry,
  MarketUuid,
  SellSharesInMarketInput,
} from 'src/types/market';
import { z } from 'zod';

const marketService = new MarketService();

export const marketShareRouter = router({
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
});
