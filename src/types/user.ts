import { z } from 'zod';

export const UserUuid = z.string().uuid().brand('user');
export type UserUuid = z.infer<typeof UserUuid>;

export const Email = z.string().email();
export type Email = z.infer<typeof Email>;

export const User = z.object({
  uuid: UserUuid,
  email: Email,
  name: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  lastLogin: z.string().datetime().optional(),
});
export type User = z.infer<typeof User>;
