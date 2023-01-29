import { z } from 'zod';

export const UserUuid = z.string().uuid().brand('user');
export type UserUuid = z.infer<typeof UserUuid>;
