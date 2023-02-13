import { filterUserLiveShares, parseLedger } from 'src/common/markets/utils';
import { Context } from 'src/server/context';
import { prisma } from 'src/server/prisma';
import {
  BuySharesInMarketInput,
  CreateMarketInput,
  LedgerEntry,
  Market,
  MarketAlignment,
  MarketUuid,
  MarketWithActivity,
  SellSharesInMarketInput,
  TransactionType,
} from 'src/types/market';
import { User } from 'src/types/user';

export class MarketService {
  async create(ctx: Context, input: CreateMarketInput) {
    if (!ctx.user) {
      throw new Error('no auth');
    }
    const { uuid: userUuid } = ctx.user;
    const market = await prisma.market.create({
      data: {
        createdByUserUuid: userUuid,
        question: input.question,
        description: input.description,
        closedAt: input.closedAt,
      },
    });
    return MarketUuid.parse(market.uuid);
  }

  async get(_ctx: Context, marketUuid: MarketUuid) {
    const market = await prisma.market.findUnique({
      where: {
        uuid: marketUuid,
      },
      include: {
        marketLedger: {
          include: {
            user: true,
          },
        },
        createdByUser: true,
      },
    });
    if (!market) {
      throw new Error('market not found');
    }
    return MarketWithActivity.parse({
      ...market,
      resolvedAt: market.resolvedAt?.toISOString(),
      createdAt: market.createdAt.toISOString(),
      updatedAt: market.updatedAt.toISOString(),
      marketLedger: market.marketLedger.map((entry) => ({
        ...entry,
        createdAt: entry.createdAt.toISOString(),
      })),
      createdByUser: User.parse({
        ...market.createdByUser,
        createdAt: market.createdByUser.createdAt.toISOString(),
        updatedAt: market.createdByUser.updatedAt.toISOString(),
        lastLogin: market.createdByUser.lastLogin?.toISOString(),
      }),
      closedAt: market.closedAt?.toISOString(),
      resolutionAlignment: market.resolutionAlignment?.toString(),
    });
  }

  async list(_ctx: Context) {
    const markets = await prisma.market.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return markets.map((market) =>
      Market.parse({
        ...market,
        resolvedAt: market.resolvedAt?.toISOString(),
        createdAt: market.createdAt.toISOString(),
        updatedAt: market.updatedAt.toISOString(),
        resolutionAlignment: market.resolutionAlignment?.toString(),
        closedAt: market.closedAt?.toISOString(),
      }),
    );
  }

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
