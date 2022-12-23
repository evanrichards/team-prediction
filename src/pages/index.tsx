import { trpc } from '../utils/trpc';
// import { signIn, signOut, useSession } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
export const SignupInput = z.object({
  email: z.string().email(),
  name: z.string(),
});
export type SignupInput = z.infer<typeof SignupInput>;

export default function IndexPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(SignupInput),
  });
  const signup = trpc.post.signup.useMutation();
  const onSubmit = async (data: SignupInput) => {
    try {
      await signup.mutateAsync(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Team Prediction</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <h1>Team Prediction</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">Name</label>
          <input {...register('name', { required: true })} />
          {errors.name && <span>This field is required</span>}
          <label htmlFor="email">Email</label>
          <input {...register('email', { required: true })} />
          {errors.email && <span>This field is required</span>}
          {/* errors will return when field validation fails  */}
          <input type="submit" />
        </form>
      </div>
    </>
  );
}

/**
 * If you want to statically render this page
 * - Export `appRouter` & `createContext` from [trpc].ts
 * - Make the `opts` object optional on `createContext()`
 *
 * @link https://trpc.io/docs/ssg
 */
// export const getStaticProps = async (
//   context: GetStaticPropsContext<{ filter: string }>,
// ) => {
//   const ssg = createSSGHelpers({
//     router: appRouter,
//     ctx: await createContext(),
//   });
//
//   await ssg.fetchQuery('post.all');
//
//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       filter: context.params?.filter ?? 'all',
//     },
//     revalidate: 1,
//   };
// };
