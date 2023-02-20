import {
  filterUserLiveShares,
  marketChangesByUser,
  marketValueDisplay,
} from 'src/common/markets/utils';
import { HeadingMd } from 'src/components/heading';
import { LedgerEntry } from 'src/types/market';
import { UserUuid } from 'src/types/user';

export default function MarketPosition({
  userUuid,
  ledger,
}: {
  userUuid: UserUuid;
  ledger: LedgerEntry[];
}) {
  const liveShares = filterUserLiveShares(ledger, userUuid);
  const activity = marketChangesByUser(ledger).filter(
    (entry) => entry.userUuid === userUuid,
  );

  return (
    <>
      <p className={'text-green'}>Yes: {liveShares.yesLiveCount}</p>
      <p className={'text-maroon'}>No: {liveShares.noLiveCount}</p>
      <HeadingMd>Your Activity</HeadingMd>
      <ul className={'list-disc px-4'}>
        {activity.map((entry, i) => (
          <li className={'py-2'} key={`${i}`}>
            <div>
              <div
                className={
                  'text-gray title-font text-sm uppercase tracking-widest'
                }
              >{`${entry.firstEntry.toLocaleDateString()}`}</div>
              <div>
                {`${entry.transactionType} ${entry.count} ${
                  entry.marketAlignment
                } from ${marketValueDisplay(
                  entry.fromValue,
                )} to ${marketValueDisplay(entry.toValue)}`}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
