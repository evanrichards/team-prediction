import tw from 'tailwind-styled-components';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';

export default function Navbar() {
  const session = useSession();
  const signedIn = session.status === 'authenticated';
  console.log(session.status, signedIn);
  return (
    <NavbarComponent>
      <NavbarBrand>
        <a
          href={
            (process.env.NEXT_PUBLIC_VERCEL_URL
              ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
              : 'http://localhost:3000') + '/'
          }
          className="flex items-center"
        >
          <Image
            priority
            src="/icon.png"
            alt="Logo"
            width={25}
            height={25}
            className={'mr-3 h-6 w-auto sm:h-9'}
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Team Prediction
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-6 w-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-base md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium md:dark:bg-base">
            <li>
              <NavbarOption href="/market" aria-current="page">
                Home
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
                <NavbarOption href="/login">Sign In</NavbarOption>
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
border-gray-200
bg-white
px-2
py-2.5
dark:bg-base
sm:px-4
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
md:hover:text-blue-700
block
rounded
py-2
pl-3
pr-4
text-gray-700
hover:bg-gray-100
dark:text-gray-400
dark:hover:bg-gray-700
dark:hover:text-white
md:border-0
md:p-0
md:hover:bg-transparent
md:dark:hover:bg-transparent
md:dark:hover:text-white
`;
