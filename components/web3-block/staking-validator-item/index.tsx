import * as React from 'react';
import classNames from 'classnames';
import { CaretRight, CheckCircle } from 'phosphor-react';
import type { IconTheme } from '@polkadot/react-identicon/types';
import type BigNumber from 'bignumber.js';
import type { Web3BlockProps } from '../base';
import Web3Block from '../base';
import SwAvatar from '../../sw-avatar';
import Icon from '../../icon';
import Number from '../../number';
import { ConfigContext } from '../../config-provider';
import useStyle from './style';

export interface StakingValidatorItemProps extends Web3BlockProps {
  validatorAddress: string;
  identPrefix: number;
  validatorName: string;
  expectedReturn: string | number | BigNumber;
  identTheme?: IconTheme;
  extraComponent?: React.ReactNode;
  onPressItem?: () => void;
}

const StakingValidatorItem: React.FC<StakingValidatorItemProps> = ({
  validatorAddress,
  identPrefix,
  identTheme,
  validatorName,
  expectedReturn,
  extraComponent,
  onPressItem,
  leftItem,
  middleItem,
  rightItem,
  ...props
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('staking-validator-item');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const classes = classNames(prefixCls, hashId);

  return wrapSSR(
    <Web3Block
      {...props}
      className={classes}
      leftItem={
        leftItem || (
          <SwAvatar
            value={validatorAddress}
            size={24}
            identPrefix={identPrefix}
            theme={identTheme}
          />
        )
      }
      middleItem={
        middleItem || (
          <>
            <div className={`${prefixCls}-name-wrapper`}>
              <div className={`${prefixCls}-name`}>{validatorName}</div>
              <Icon
                type="phosphor"
                phosphorIcon={CheckCircle}
                size="xs"
                iconColor="#4CEAAC"
                weight="fill"
              />
            </div>
            {extraComponent}
          </>
        )
      }
      rightItem={
        rightItem || (
          <div className={`${prefixCls}-right-part`}>
            <Number
              value={expectedReturn}
              decimal={0}
              suffix="%"
              intColor="#4CEAAC"
              decimalColor="#4CEAAC"
              unitColor="#4CEAAC"
            />
            <Icon
              className={`${prefixCls}-right-icon`}
              type="phosphor"
              phosphorIcon={CaretRight}
              size="sm"
            />
          </div>
        )
      }
      onClick={onPressItem}
    />,
  );
};

export default StakingValidatorItem;
