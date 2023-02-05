import tw from 'tailwind-styled-components';

type ButtonProps = {
  onClick?: () => void;
  flavor?: 'primary' | 'secondary';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

export default function Button({
  children,
  ...props
}: React.PropsWithChildren<ButtonProps>) {
  return (
    <ButtonInner
      type={props.type}
      disabled={props.disabled}
      $flavor={props.flavor}
    >
      {children}
    </ButtonInner>
  );
}

const ButtonInner = tw.button<{
  $flavor?: 'primary' | 'secondary';
}>`

${(p) =>
  p.$flavor && p.$flavor === 'secondary' ? 'bg-surface0' : 'bg-lavender'}

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
