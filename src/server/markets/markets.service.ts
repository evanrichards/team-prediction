import { filterUserLiveShares, parseLedger } from 'src/common/markets/utils';
import { Context } from 'src/server/context';
import { prisma } from 'src/server/prisma';
import {
  BuySharesInMarketInput,
  LedgerEntry,
  MarketAlignment,
  MarketUuid,
  SellSharesInMarketInput,
  TransactionType,
} from 'src/types/market';

export class MarketService {
  async getActivityForMarket(_ctx: Context, marketUuid: MarketUuid) {
    const activity = await prisma.marketLedger.findMany({
      where: {
        marketUuid,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    return activity.map((entry) =>
      LedgerEntry.parse({
        ...entry,
        createdAt: entry.createdAt.toISOString(),
      }),
    );
  }

  async getCurrentMarketValue(_ctx: Context, marketUuid: MarketUuid) {
    const activity = await this.getActivityForMarket(_ctx, marketUuid);
    const split = parseLedger(activity);
    return (split.yesBuyCount - split.yesSellCount) / split.totalLiveCount;
  }

  async buySharesInMarket(ctx: Context, input: BuySharesInMarketInput) {
    if (!ctx.user) {
      throw new Error('no auth');
    }
    const { uuid: userUuid } = ctx.user;
    await prisma.$transaction(
      new Array(input.shares).fill(0).map(() =>
        prisma.marketLedger.create({
          data: {
            marketUuid: input.marketUuid,
            userUuid,
            marketAlignment: input.alignment,
            transactionType: TransactionType.enum.BUY,
          },
        }),
      ),
    );
    return this.getActivityForMarket(ctx, input.marketUuid);
  }

  async sellSharesInMarket(ctx: Context, input: SellSharesInMarketInput) {
    if (!ctx.user) {
      throw new Error('no auth');
    }
    const { uuid: userUuid } = ctx.user;
    const allShares = await this.getActivityForMarket(ctx, input.marketUuid);
    const userLiveShares = filterUserLiveShares(allShares, userUuid);
    if (
      (input.alignment === MarketAlignment.enum.YES &&
        userLiveShares.yesLiveCount < input.shares) ||
      (input.alignment === MarketAlignment.enum.NO &&
        userLiveShares.noLiveCount < input.shares)
    ) {
      throw new Error('not enough shares to sell');
    }
    await prisma.$transaction(
      new Array(input.shares).fill(0).map(() =>
        prisma.marketLedger.create({
          data: {
            marketUuid: input.marketUuid,
            userUuid,
            marketAlignment: input.alignment,
            transactionType: TransactionType.enum.SELL,
          },
        }),
      ),
    );

    return this.getActivityForMarket(ctx, input.marketUuid);
  }
}
