import { z } from 'zod';
import { MarketUuid } from 'src/types/market';
import { UserUuid } from 'src/types/user';

export const MessageUuid = z.string().uuid().brand('message');
export type MessageUuid = z.infer<typeof MessageUuid>;

export const Message = z.object({
  uuid: MessageUuid,
  userUuid: UserUuid,
  userName: z.string().optional(),
  marketUuid: MarketUuid,
  message: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type Message = z.infer<typeof Message>;

export const CreateMessageInput = Message.pick({
  message: true,
  marketUuid: true,
});
export type CreateMarketInput = z.infer<typeof CreateMessageInput>;
