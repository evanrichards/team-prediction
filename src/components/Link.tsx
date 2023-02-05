import NextLink from 'next/link';
import tw from 'tailwind-styled-components';
export const Link = tw(NextLink)<{
  $afterContent?: string | false;
}>`
text-rosewater
hover:underline
hover:underline-offset-4
${(p) =>
  p.$afterContent === undefined
    ? `after:content-['_↗']`
    : p.$afterContent ?? `after:content-['${p.$afterContent}']`}
`;
