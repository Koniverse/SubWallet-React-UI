import type * as React from 'react';
import type { AccountItemProps } from './AccountItem';
import InternalAccountItem from './AccountItem';
import AccountItemSelection from './AccountItemSelection';

export type { AccountItemProps } from './AccountItem';
export type { AccountItemSelectionProps } from './AccountItemSelection';

type CompoundedComponent = React.ForwardRefExoticComponent<
  AccountItemProps & React.RefAttributes<HTMLElement>
> & {
  AccountItemSelection: typeof AccountItemSelection;
};

const AccountItem = InternalAccountItem as CompoundedComponent;

AccountItem.AccountItemSelection = AccountItemSelection;

export default AccountItem;
