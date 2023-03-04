import { Context } from 'src/server/context';
import { prisma } from 'src/server/prisma';
import { CreateMarketInput, Message } from 'src/types/message';
import { MarketUuid } from 'src/types/market';
import nullthrows from 'nullthrows';
import { EventEmitter } from 'events';

export const MessageEventEmitter = new EventEmitter();

export const MessageEvents = {
  CREATE: 'message:create',
} as const;

export class MessageService {
  async create(ctx: Context, input: CreateMarketInput) {
    const resp = await prisma.message.create({
      data: {
        createdByUserUuid: nullthrows(ctx.user?.uuid),
        message: input.message,
        marketUuid: input.marketUuid,
      },
    });
    if (!resp) {
      throw new Error('no message created');
    }
    const message = Message.parse({
      uuid: resp.uuid,
      userUuid: resp.createdByUserUuid,
      userName: ctx.user?.name,
      marketUuid: resp.marketUuid,
      message: resp.message,
      createdAt: resp.createdAt.toISOString(),
      updatedAt: resp.updatedAt.toISOString(),
    });
    MessageEventEmitter.emit(MessageEvents.CREATE, message);
    return message;
  }
  async listForMarket(marketUuid: MarketUuid) {
    const resp = await prisma.message.findMany({
      where: { marketUuid },
      orderBy: { createdAt: 'desc' },
      include: {
        createdByUser: {
          select: {
            name: true,
          },
        },
      },
      take: 100, // TODO paginate this
    });
    return resp
      .map((message) =>
        Message.parse({
          uuid: message.uuid,
          userUuid: message.createdByUserUuid,
          userName: message.createdByUser.name,
          marketUuid: message.marketUuid,
          message: message.message,
          createdAt: message.createdAt.toISOString(),
          updatedAt: message.updatedAt.toISOString(),
        }),
      )
      .reverse();
  }
}
