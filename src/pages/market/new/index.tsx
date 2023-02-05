import { FieldError, FieldErrorsImpl, Merge, useForm } from 'react-hook-form';
import Layout from 'src/components/layout';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import tw from 'tailwind-styled-components';
import Button from 'src/components/button/Button';

const newMarketSchema = z.object({
  question: z
    .string()
    .trim()
    .min(1, { message: 'A market requires a question' }),
  description: z
    .string()
    .trim()
    .min(1, { message: 'A description is required' }),
});
export default function NewMarketPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newMarketSchema),
  });
  return (
    <Layout pageTitle={'Create New Market'}>
      <FormContainer>
        <form
          onSubmit={handleSubmit((d) => {
            const a = newMarketSchema.parse(d);
            console.log(a);
          })}
        >
          <FormItem>
            <label htmlFor="question">Question</label>
            <FormInput type="text" {...register('question')} />
            <ErrorMessage fieldError={errors.question} />
          </FormItem>
          <FormItem>
            <label htmlFor="description">Description</label>
            <FormTextArea {...register('description')} />
            <ErrorMessage fieldError={errors.description} />
          </FormItem>
          <FormItem>
            <Button type="submit">Submit</Button>
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
