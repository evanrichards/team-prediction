import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { trpc } from 'utils/trpc';
import { z } from 'zod';
export const SignupInput = z.object({
  email: z.string().email(),
  name: z.string(),
});
export type SignupInput = z.infer<typeof SignupInput>;

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(SignupInput),
  });
  const signup = trpc.signup.signup.useMutation();
  const onSubmit = async (data: SignupInput) => {
    try {
      await signup.mutateAsync(data);
    } catch (error) {
      console.log(error);
    }
  };

  const countQuery = trpc.signup.signupCount.useQuery();
  return (
    <div className="border-ctp-overlay0 border-4 rounded-lg p-6">
      {countQuery.data !== undefined && (
        <span className="m-2">Signup Count: {countQuery.data?.count ?? 0}</span>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="m-2 bg-ctp-overlay0"
          placeholder="Name"
          {...register('name', { required: true })}
        />
        {errors.name && <span>This field is required</span>}
        <br />
        <input
          className="m-2 bg-ctp-overlay0"
          placeholder="Email"
          {...register('email', { required: true })}
        />
        {errors.email && <span>This field is required</span>}
        <br />
        <input disabled className="m-2 text-ctp-rosewater" type="submit" />
      </form>
    </div>
  );
};
export default Signup;
