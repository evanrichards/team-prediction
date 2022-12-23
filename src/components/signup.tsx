import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Label, TextInput } from 'flowbite-react';
import { Controller, useForm } from 'react-hook-form';
import { trpc } from 'utils/trpc';
import { z } from 'zod';
export const SignupInput = z.object({
  email: z.string().email(),
  name: z.string(),
});
export type SignupInput = z.infer<typeof SignupInput>;

const Signup = () => {
  const {
    handleSubmit,
    control,
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
    <div className="rounded-lg border-4 border-ctp-overlay0 p-6">
      {countQuery.data !== undefined && (
        <span className="m-2">Signup Count: {countQuery.data?.count ?? 0}</span>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Name" className="text-ctp-pink" />
          </div>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextInput className="text-ctp-text" {...field} />
            )}
          />
          {errors.name && <span>This field is required</span>}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" className="text-ctp-pink" />
          </div>
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextInput className="border-green-900" {...field} />
            )}
          />
          {errors.email && <span>This field is required</span>}
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};
export default Signup;
