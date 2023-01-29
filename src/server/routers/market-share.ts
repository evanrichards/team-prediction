import { MarketService } from 'src/server/markets/markets.service';
import { authedProcedure, router } from 'src/server/trpc';
import {
  BuySharesInMarketInput,
  LedgerEntry,
  MarketUuid,
  SellSharesInMarketInput,
} from 'src/types/market';

const marketService = new MarketService();

export const marketShareRouter = router({
  marketActivity: authedProcedure
    .input(MarketUuid)
    .output(LedgerEntry.array())
    .query(async ({ ctx, input }) => {
      return marketService.getActivityForMarket(ctx, input);
    }),
  buySharesInMarket: authedProcedure
    .input(BuySharesInMarketInput)
    .output(LedgerEntry.array())
    .mutation(async ({ ctx, input }) => {
      return marketService.buySharesInMarket(ctx, input);
    }),
  sellSharesInMarket: authedProcedure
    .input(SellSharesInMarketInput)
    .output(LedgerEntry.array())
    .mutation(async ({ ctx, input }) => {
      return marketService.sellSharesInMarket(ctx, input);
    }),
});
