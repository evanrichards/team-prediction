import Button from 'src/components/Button';
import tw from 'tailwind-styled-components';
import { Switch, Listbox, Transition } from '@headlessui/react';

import { Fragment, ReactNode, useState } from 'react';
import { MarketResolutionAlignment } from 'src/types/market';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

const resolutionOptions = [
  {
    id: 'option',
    name: 'Resolution',
    unavailable: true,
  },
  ...MarketResolutionAlignment.options.map((value) => ({
    id: value,
    name: value,
    unavailable: false,
  })),
];

export default function MarketAdminCard({
  handleResolveMarket,
  handleCloseMarket,
  marketIsClosed,
  marketIsResolved,
}: {
  handleResolveMarket: (resolutionAlignment: MarketResolutionAlignment) => void;
  handleCloseMarket: () => void;
  marketIsClosed: boolean;
  marketIsResolved: boolean;
}) {
  const [enabled, setEnabled] = useState(false);

  const [resolutionAlignment, setResolutionAlignment] = useState(
    resolutionOptions[0],
  );
  return (
    <>
      {!marketIsClosed && !marketIsResolved && (
        <MarketAdminContainer>
          <div className="ml-auto">
            <div className="flex flex-wrap items-center gap-4">
              <Switch.Group>
                <Switch.Label passive>
                  Enable irreversable admin buttons
                </Switch.Label>
                <Switch
                  checked={enabled}
                  onChange={setEnabled}
                  className="relative inline-flex h-6 w-11 items-center rounded-full ui-checked:bg-maroon ui-not-checked:bg-overlay0"
                >
                  <span className="inline-block h-4 w-4 transform rounded-full bg-text transition ui-checked:translate-x-6 ui-not-checked:translate-x-1" />
                </Switch>
              </Switch.Group>
              {!marketIsClosed && (
                <Button
                  disabled={!enabled}
                  flavor="danger"
                  onClick={handleCloseMarket}
                >
                  Close Market
                </Button>
              )}
              <div className="w-36">
                <Listbox
                  value={resolutionAlignment}
                  onChange={setResolutionAlignment}
                  disabled={!enabled}
                >
                  <div className="relative mt-1">
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-surface2 py-1 ring-1 ring-mantle ring-opacity-5 focus:outline-none sm:text-sm">
                        {resolutionOptions.map((person) => (
                          <Listbox.Option
                            key={person.id}
                            value={person}
                            disabled={person.unavailable}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active ? 'text-maroon' : 'text-crust'
                              }`
                            }
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? 'font-medium' : 'font-normal'
                                  }`}
                                >
                                  {person.name}
                                </span>

                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-maroon">
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                    <ListboxButton $disabled={!enabled}>
                      <span className={'block truncate'}>
                        {resolutionAlignment.name}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </span>
                    </ListboxButton>
                  </div>
                </Listbox>
              </div>
              <Button
                disabled={!enabled || resolutionAlignment.unavailable}
                type="button"
                flavor="danger"
                onClick={() => {
                  const alignment = MarketResolutionAlignment.parse(
                    resolutionAlignment.name,
                  );
                  handleResolveMarket(alignment);
                }}
              >
                Resolve Market
              </Button>
            </div>
          </div>
        </MarketAdminContainer>
      )}
    </>
  );
}

const ListboxButton = tw(Listbox.Button)<{
  $disabled: boolean;
  children: ReactNode;
}>`
${({ $disabled }) => ($disabled ? 'bg-surface2' : 'bg-maroon')}
relative
w-full
rounded-lg
py-2
pl-3
pr-10
text-left
text-crust
focus:outline-none
focus-visible:border-lavender
focus-visible:ring-2
focus-visible:ring-lavender
sm:text-lg
`;

const MarketAdminContainer = tw.div`
flex flex-wrap gap-4
`;
