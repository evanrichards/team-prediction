import tw from 'tailwind-styled-components';
import Image from 'next/image';
import { signOut, signIn, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Navbar() {
  const session = useSession();
  const signedIn = session.status === 'authenticated';
  return (
    <NavbarComponent>
      <NavbarBrand>
        <Link
          href={
            (process.env.NEXT_PUBLIC_VERCEL_URL
              ? `${
                  process.env.NEXT_PUBLIC_VERCEL_URL.startsWith('http')
                    ? ''
                    : 'https://'
                }${process.env.NEXT_PUBLIC_VERCEL_URL}`
              : 'localhost:3000') + '/'
          }
          className="flex items-center"
        >
          <Image
            priority
            src="/icon.png"
            alt="Logo"
            width={25}
            height={25}
            className={'mr-3 h-6 w-auto rounded-full sm:h-9'}
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold ">
            Team Prediction
          </span>
        </Link>
        <div>
          <ul className="flex flex-row rounded-lg p-4 text-sm font-medium ">
            <li>
              <NavbarOption href="/" aria-current="page">
                Home
              </NavbarOption>
            </li>
            <li>
              <NavbarOption href="/market" aria-current="page">
                Markets
              </NavbarOption>
            </li>
            <li>
              <NavbarOption href="/about">About</NavbarOption>
            </li>
            <li>
              <NavbarOption href="/contact">Contact</NavbarOption>
            </li>
            {signedIn ? (
              <li>
                <NavbarOption href="#" onClick={() => signOut()}>
                  Sign out
                </NavbarOption>
              </li>
            ) : (
              <li>
                <NavbarOption href="#" onClick={() => signIn()}>
                  Sign In
                </NavbarOption>
              </li>
            )}
          </ul>
        </div>
      </NavbarBrand>
    </NavbarComponent>
  );
}
const NavbarComponent = tw.nav`
rounded
bg-crust
px-2
py-2.5
`;

const NavbarBrand = tw.div`
container
mx-auto
flex
flex-wrap
items-center
justify-between
`;

const NavbarOption = tw.a`
block
rounded
py-2
pl-3
pr-4
text-rosewater
`;
