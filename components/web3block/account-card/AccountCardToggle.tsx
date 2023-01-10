import * as React from 'react';
import type { IconTheme } from '@polkadot/react-identicon/types';
import AccountCard from './AccountCard';
import Switch from '../../switch';

export interface AccountCardToggleProps {
  address: string;
  accountName: string;
  theme: IconTheme;
  prefix: number;
  isShowSubIcon: boolean;
  subIcon?: React.ReactNode;
  preLength?: number;
  subLength?: number;
  checked?: boolean;
  onToggle?: () => void;
}

const AccountCardToggle: React.FC<AccountCardToggleProps> = ({
  accountName,
  address,
  theme,
  prefix,
  isShowSubIcon,
  subIcon,
  preLength,
  subLength,
  checked,
  onToggle,
}) => {
  const getRightComponent = () => (
    <div className="ant-account-card-right-part">
      <Switch checked={checked} onChange={onToggle} />
    </div>
  );
  return (
    <AccountCard
      accountName={accountName}
      address={address}
      size={40}
      theme={theme}
      prefix={prefix}
      isShowSubIcon={isShowSubIcon}
      subIcon={subIcon}
      preLength={preLength}
      subLength={subLength}
      rightComponent={getRightComponent()}
    />
  );
};

export default AccountCardToggle;
