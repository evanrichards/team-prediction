import { prisma } from '../prisma';
import { publicProcedure, router } from '../trpc';
import { z } from 'zod';

export const SignupInput = z.object({
  email: z.string().email(),
  name: z.string(),
});
export type SignupInput = z.infer<typeof SignupInput>;

export const signupRouter = router({
  signup: publicProcedure.input(SignupInput).mutation(async ({ input }) => {
    const resp = await prisma.signup.create({
      data: {
        name: input.name,
        email: input.email,
      },
    });
    return resp.id;
  }),

  signupCount: publicProcedure.query(async () => {
    const count = await prisma.signup.count();
    return {
      count,
    };
  }),
});
