import * as React from 'react';
import classNames from 'classnames';
import { CaretRight, CheckCircle } from 'phosphor-react';
import type { IconTheme } from '@polkadot/react-identicon/types';
import type BigNumber from 'bignumber.js';
import Web3Block from '../base';
import SwAvatar from '../../sw-avatar';
import Icon from '../../icon';
import Number from '../../number';
import { ConfigContext } from '../../config-provider';
import useStyle from './style';

export interface StakingValidatorItemProps {
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
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('staking-validator-item');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const classes = classNames(prefixCls, hashId);

  const getLeftItem = () => (
    <SwAvatar value={validatorAddress} size={24} identPrefix={identPrefix} theme={identTheme} />
  );

  const getMiddleItem = () => (
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
  );

  const getRightItem = () => (
    <div className={`${prefixCls}-right-part`}>
      <Number
        value={expectedReturn}
        decimal={0}
        suffix="%"
        leftColor="#4CEAAC"
        rightColor="#4CEAAC"
      />
      <Icon
        className={`${prefixCls}-right-icon`}
        type="phosphor"
        phosphorIcon={CaretRight}
        size="xs"
      />
    </div>
  );

  return wrapSSR(
    <Web3Block
      className={classes}
      leftItem={getLeftItem()}
      middleItem={getMiddleItem()}
      rightItem={getRightItem()}
      onClick={onPressItem}
    />,
  );
};

export default StakingValidatorItem;
