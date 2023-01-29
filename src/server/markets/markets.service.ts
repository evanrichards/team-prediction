import nullthrows from 'nullthrows';
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

  async buySharesInMarket(ctx: Context, input: BuySharesInMarketInput) {
    if (!ctx.user) {
      throw new Error('no auth');
    }
    await prisma.$transaction(
      new Array(input.shares).fill(0).map(() =>
        prisma.marketLedger.create({
          data: {
            marketUuid: input.marketUuid,
            userUuid: nullthrows(ctx.user.uuid),
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
    const userUuid = nullthrows(ctx.user.uuid);
    const allShares = await this.getActivityForMarket(ctx, input.marketUuid);
    const userShares = allShares.filter((share) => share.userUuid === userUuid);
    if (input.alignment === MarketAlignment.enum.YES) {
      const yesShares = userShares.filter(
        (share) => share.marketAlignment === MarketAlignment.enum.YES,
      );
      const yesBuyShares = yesShares.filter(
        (share) => share.transactionType === TransactionType.enum.BUY,
      );
      const yesSellShares = yesShares.filter(
        (share) => share.transactionType === TransactionType.enum.SELL,
      );
      const remainingShares = yesBuyShares.length - yesSellShares.length;
      console.log('remainingShares', remainingShares);
      if (remainingShares < input.shares) {
        throw new Error('Not enough shares to sell');
      }
    } else {
      const noShares = userShares.filter(
        (share) => share.marketAlignment === MarketAlignment.enum.NO,
      );
      const noBuyShares = noShares.filter(
        (share) => share.transactionType === TransactionType.enum.BUY,
      );
      const noSellShares = noShares.filter(
        (share) => share.transactionType === TransactionType.enum.SELL,
      );
      const remainingShares = noBuyShares.length - noSellShares.length;
      console.log('remainingShares', remainingShares);
      if (remainingShares < input.shares) {
        throw new Error('Not enough shares to sell');
      }
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
