import tw from 'tailwind-styled-components';

import React from 'react';
export function Heading2XL({ children }: { children: React.ReactNode }) {
  return <Heading2XLInner>{children}</Heading2XLInner>;
}

const Heading2XLInner = tw.h1`
text-4xl
leading-tight
font-extrabold
tracking-tighter
mx-4
my-0
`;

export function HeadingXL({ children }: { children: React.ReactNode }) {
  return <HeadingXLInner>{children}</HeadingXLInner>;
}

const HeadingXLInner = tw.h1`
text-3xl
leading-snug
font-extrabold
tracking-tighter
mx-4
my-0
`;

export function HeadingLg({ children }: { children: React.ReactNode }) {
  return <HeadingLgInner>{children}</HeadingLgInner>;
}

const HeadingLgInner = tw.h1`
text-2xl
leading-normal
mx-4
my-0
`;

export function HeadingMd({ children }: { children: React.ReactNode }) {
  return <HeadingMdInner>{children}</HeadingMdInner>;
}

const HeadingMdInner = tw.h1`
text-xl
leading-normal
`;
