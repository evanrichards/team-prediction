import { authedProcedure, publicProcedure, router } from 'src/server/trpc';
import { User } from 'src/types/user';
import { observable } from '@trpc/server/observable';
import { CreateMessageInput, Message } from 'src/types/message';
import {
  MessageEventEmitter,
  MessageEvents,
  MessageService,
} from 'src/server/messages/message.service';
import { MarketUuid } from 'src/types/market';

const messageService = new MessageService();

export const messageRouter = router({
  create: authedProcedure
    .input(CreateMessageInput)
    .output(Message)
    .mutation(async ({ ctx, input }) => messageService.create(ctx, input)),
  listForMarket: authedProcedure
    .input(MarketUuid)
    .output(Message.array())
    .query(async ({ input }) => messageService.listForMarket(input)),
  onNewMessage: publicProcedure.subscription(() => {
    return observable<Message>((emit) => {
      const onNew = (data: Message) => emit.next(data);
      MessageEventEmitter.on(MessageEvents.CREATE, onNew);
      return () => {
        MessageEventEmitter.off(MessageEvents.CREATE, onNew);
      };
    });
  }),
});
