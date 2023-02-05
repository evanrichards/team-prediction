import Link from 'next/link';
import tw from 'tailwind-styled-components';

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  flavor?: 'primary' | 'secondary';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

export default function Button({
  children,
  ...props
}: React.PropsWithChildren<ButtonProps>) {
  if (props.href) {
    return (
      <LinkButton $flavor={props.flavor} href={props.href}>
        {children}
      </LinkButton>
    );
  }
  return (
    <ButtonInner
      onClick={props.onClick}
      type={props.type}
      disabled={props.disabled}
      $flavor={props.flavor}
    >
      {children}
    </ButtonInner>
  );
}

const buttonStyles = `
my-2

text-crust
hover:bg-blue
border-0
py-2
px-6
focus:outline-none
rounded
text-lg
`;

const LinkButton = tw(Link)<{
  $flavor?: 'primary' | 'secondary';
}>`
${() => buttonStyles}
${(p) =>
  p.$flavor && p.$flavor === 'secondary' ? 'bg-surface0' : 'bg-lavender'}
`;

const ButtonInner = tw.button<{
  $flavor?: 'primary' | 'secondary';
  disabled?: boolean;
}>`
${() => buttonStyles}
${(p) =>
  p.$flavor && p.$flavor === 'secondary' ? 'bg-surface0' : 'bg-lavender'}
${(p) => p.disabled && 'hover:bg-surface1'}
${(p) => p.disabled && 'bg-surface1'}
`;
