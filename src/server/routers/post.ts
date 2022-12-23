/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { prisma } from '../prisma';
import { authedProcedure, publicProcedure, router } from '../trpc';
import { z } from 'zod';

// In a real app, you'd probably use Redis or something

export const SignupInput = z.object({
  email: z.string().email(),
  name: z.string(),
});
export type SignupInput = z.infer<typeof SignupInput>;

export const postRouter = router({
  add: authedProcedure
    .input(
      z.object({
        id: z.string().uuid().optional(),
        text: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx }) => {
      const { name } = ctx.user;
      return name;
    }),

  signup: publicProcedure.input(SignupInput).mutation(async ({ input }) => {
    const resp = await prisma.signup.create({
      data: {
        name: input.name,
        email: input.email,
      },
    });
    return resp.id;
  }),

  infinite: publicProcedure
    .input(
      z.object({
        cursor: z.date().nullish(),
        take: z.number().min(1).max(50).nullish(),
      }),
    )
    .query(async ({ input }) => {
      return {};
    }),
});
