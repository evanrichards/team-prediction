import { FieldError, FieldErrorsImpl, Merge, useForm } from 'react-hook-form';
import Layout from 'src/components/layout';
import { zodResolver } from '@hookform/resolvers/zod';
import tw from 'tailwind-styled-components';
import Button from 'src/components/Button';
import { CreateMarketInput } from 'src/types/market';
import { trpc } from 'src/utils/trpc';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function NewMarketPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CreateMarketInput),
  });
  const router = useRouter();
  const createMarket = trpc.market.create.useMutation();
  useEffect(() => {
    if (createMarket.status === 'success') {
      router.push(`/market/${createMarket.data}`);
    }
  }, [router, createMarket.status, createMarket.data]);
  return (
    <Layout pageTitle={'Create New Market'}>
      <FormContainer>
        <form
          onSubmit={handleSubmit((d) => {
            const a = CreateMarketInput.parse(d);
            createMarket.mutate(a);
          })}
        >
          <FormItem>
            <label>
              Question
              <FormInput type="text" {...register('question')} />
            </label>
            <ErrorMessage fieldError={errors.question} />
          </FormItem>
          <FormItem>
            <label>
              Description
              <FormTextArea {...register('description')} />
            </label>
            <ErrorMessage fieldError={errors.description} />
          </FormItem>
          <FormItem>
            <Button type="submit" disabled={createMarket.isLoading}>
              Submit
            </Button>
          </FormItem>
        </form>
      </FormContainer>
    </Layout>
  );
}

const ErrorMessage = ({
  fieldError,
}: {
  fieldError?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}) => {
  return (
    <>
      {fieldError?.message && (
        <p className="text-maroon">{`• ${fieldError.message.toString()}`}</p>
      )}
    </>
  );
};

const FormInput = tw.input`
w-full
py-1
px-3
leading-8

rounded
border

bg-surface2
outline-none
text-text
border-overlay0

focus:border-lavender
focus:bg-surface1
focus:ring-2
focus:ring-lavender
focus:text-rosewater

transition-colors
duration-200
ease-in-out
`;

const FormTextArea = tw.textarea`
w-full
py-1
px-3
leading-8

rounded
border

bg-surface2
outline-none
text-text
border-overlay0

focus:border-lavender
focus:bg-surface1
focus:ring-2
focus:ring-lavender
focus:text-rosewater

transition-colors
duration-200
ease-in-out
`;

const FormItem = tw.div`
flex
flex-col
gap-1
`;

const FormContainer = tw.div`
container
mx-auto
gap-4
h-full`;
