import * as React from 'react';
import { Check, Copy, DotsThree } from 'phosphor-react';
import type { IconTheme } from '@polkadot/react-identicon/types';
import CopyToClipboard from 'react-copy-to-clipboard';
import AccountCard from './AccountCard';
import Icon from '../../icon';

export interface AccountCardSelectionProps {
  address: string;
  accountName: string;
  theme: IconTheme;
  prefix: number;
  isShowSubIcon: boolean;
  isSelected?: boolean;
  showCopy?: boolean;
  showOption?: boolean;
  subIcon?: React.ReactNode;
  preLength?: number;
  subLength?: number;
  onCopy?: () => void;
  onPressOption?: () => void;
}

const AccountCardSelection: React.FC<AccountCardSelectionProps> = ({
  accountName,
  isSelected,
  showCopy,
  showOption,
  address,
  theme,
  prefix,
  isShowSubIcon,
  subIcon,
  preLength,
  subLength,
  onCopy,
  onPressOption,
}) => {
  const getRightComponent = () => (
    <div className="ant-account-card-right-part">
      {isSelected && (
        <div className="ant-account-card-icon">
          <Icon type="phosphor" phosphorIcon={Check} size="xs" iconColor="#4CEAAC" />
        </div>
      )}
      {showCopy && (
        <CopyToClipboard text={address}>
          <div className="ant-account-card-icon" onClick={onCopy}>
            <Icon
              type="phosphor"
              phosphorIcon={Copy}
              size="xs"
              iconColor="rgba(255, 255, 255, 0.45)"
            />
          </div>
        </CopyToClipboard>
      )}
      {showOption && (
        <div className="ant-account-card-icon" onClick={onPressOption}>
          <Icon
            type="phosphor"
            phosphorIcon={DotsThree}
            size="xs"
            iconColor="rgba(255, 255, 255, 0.45)"
          />
        </div>
      )}
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
      isSelected={isSelected}
      rightComponent={getRightComponent()}
    />
  );
};

export default AccountCardSelection;
