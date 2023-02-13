import Button from 'src/components/Button';
import tw from 'tailwind-styled-components';
import { Switch } from '@headlessui/react';
import { useState } from 'react';

export default function MarketAdminCard({
  handleResolveMarket,
  handleCloseMarket,
  marketIsClosed,
  marketIsResolved,
}: {
  handleResolveMarket: () => void;
  handleCloseMarket: () => void;
  marketIsClosed: boolean;
  marketIsResolved: boolean;
}) {
  const [enabled, setEnabled] = useState(false);
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
              <Button
                disabled={true}
                flavor="danger"
                onClick={handleResolveMarket}
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

const MarketAdminContainer = tw.div`
flex flex-wrap gap-4
`;
