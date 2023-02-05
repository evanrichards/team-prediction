import { Menu, Transition } from '@headlessui/react';
import { PaintBrushIcon } from '@heroicons/react/20/solid';
import React from 'react';
import { Fragment } from 'react';
import { ThemeContext } from 'src/context/theme-context';
import tw from 'tailwind-styled-components';

const themes = ['latte', 'frappe', 'macchiato', 'mocha'];

export default function ThemeSelect() {
  const { currentTheme, setTheme } = React.useContext(ThemeContext);
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton>
          <PaintBrushIcon className="h-5 w-5" aria-hidden="true" />
        </MenuButton>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems>
          <div className="py-1">
            {themes.map((theme) => (
              <Menu.Item key={theme}>
                {() => (
                  <MenuItem
                    href="#"
                    onClick={() => setTheme(theme)}
                    $active={theme === currentTheme}
                  >
                    {theme}
                  </MenuItem>
                )}
              </Menu.Item>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}

const MenuButton = tw(Menu.Button)`
inline-flex
w-full
justify-center
rounded-md
bg-base
px-2
py-2
text-sm
font-medium
text-text
shadow-sm
hover:bg-surface1
focus:outline-none
focus:ring-2
focus:ring-lavender
focus:ring-offset-2
focus:ring-offset-lavender
`;

const MenuItems = tw(Menu.Items)`
w-26
absolute
right-0
z-10
mt-2
origin-top-right
rounded-md
bg-surface1
shadow-lg
ring-1
ring-black
ring-opacity-5
focus:outline-none
`;

const MenuItem = tw.a<{ $active?: boolean }>`
${(p) => (p.$active ? 'bg-base text-pink' : 'text-text')}
block
px-4
py-2
text-sm
capitalize
`;
