import tw from 'tailwind-styled-components';

export default function Heading({ children }: { children: React.ReactNode }) {
  return <HeadingInner>{children}</HeadingInner>;
}

const HeadingInner = tw.h1`
w-full
h-16
px-4
bg-ctp-base
text-ctp-text
shadow
`;
