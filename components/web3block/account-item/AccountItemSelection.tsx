import * as React from 'react';
import { CheckCircle, Copy } from 'phosphor-react';
import type { IconTheme } from '@polkadot/react-identicon/types';
import CopyToClipboard from 'react-copy-to-clipboard';
import AccountItem from './AccountItem';
import Icon from '../../icon';
import Button from '../../button';

export interface AccountItemSelectionProps {
  address: string;
  theme: IconTheme;
  prefix: number;
  isShowSubIcon: boolean;
  isSelected?: boolean;
  showCopy?: boolean;
  subIcon?: React.ReactNode;
  preLength?: number;
  subLength?: number;
  onCopy?: () => void;
  onPressItem?: () => void;
}

const AccountItemSelection: React.FC<AccountItemSelectionProps> = ({
  isSelected,
  showCopy,
  address,
  theme,
  prefix,
  isShowSubIcon,
  subIcon,
  preLength,
  subLength,
  onCopy,
  onPressItem,
}) => {
  const getRightComponent = () => (
    <div className="ant-account-item-right-part">
      {isSelected && (
        <div className="ant-account-item-icon">
          <Icon
            type="phosphor"
            phosphorIcon={CheckCircle}
            size="sm"
            iconColor="#4CEAAC"
            weight="fill"
          />
        </div>
      )}
      {showCopy && (
        <CopyToClipboard text={address}>
          <Button
            className="ant-account-item-btn"
            type="ghost"
            size="xs"
            icon={
              <Icon
                type="phosphor"
                phosphorIcon={Copy}
                size="sm"
                iconColor="rgba(255, 255, 255, 0.45)"
              />
            }
            onClick={onCopy}
          />
        </CopyToClipboard>
      )}
    </div>
  );
  return (
    <AccountItem
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
      onPressItem={onPressItem}
    />
  );
};

export default AccountItemSelection;
