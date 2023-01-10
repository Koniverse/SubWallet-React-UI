import type * as React from 'react';
import type { AccountCardProps } from './AccountCard';
import InternalAccountCard from './AccountCard';
import AccountCardSelection from './AccountCardSelection';
import AccountCardToggle from './AccountCardToggle';

export type { AccountCardProps } from './AccountCard';
export type { AccountCardSelectionProps } from './AccountCardSelection';
export type { AccountCardToggleProps } from './AccountCardToggle';

type CompoundedComponent = React.ForwardRefExoticComponent<
  AccountCardProps & React.RefAttributes<HTMLElement>
> & {
  AccountCardSelection: typeof AccountCardSelection;
  AccountCardToggle: typeof AccountCardToggle;
};

const AccountCard = InternalAccountCard as CompoundedComponent;

AccountCard.AccountCardSelection = AccountCardSelection;
AccountCard.AccountCardToggle = AccountCardToggle;

export default AccountCard;
