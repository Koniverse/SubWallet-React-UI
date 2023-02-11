import classNames from 'classnames';
import React, { useMemo } from 'react';
import useStyle from './style';
import { SwHeaderConfig } from './configs';
import { ConfigContext } from '../config-provider';
import type { ButtonProps } from '../button';
import Button from '../button';

export type SwHeaderBackground = 'default' | 'transparent';
export type SwHeaderLeftContent = React.ReactNode | 'logo' | 'default';

export interface SwHeaderProps {
  prefixCls?: string;
  className?: string;
  background?: SwHeaderBackground;
  showLeftButton?: boolean;
  left?: SwHeaderLeftContent;
  onClickLeft?: () => void;
  rightButtons?: ButtonProps[];
  children?: React.ReactNode | React.ReactNode[];
  paddingVertical?: boolean;
  center?: boolean;
}

const SwHeader: React.FC<SwHeaderProps> = (props) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const {
    prefixCls: customizePrefixCls,
    className,
    background = 'default',
    left,
    showLeftButton,
    onClickLeft,
    rightButtons = [],
    children,
    paddingVertical,
    center = true,
  } = props;

  const prefixCls = getPrefixCls('sw-header', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const classNameExtend = useMemo(
    (): string =>
      classNames(hashId, className, `${prefixCls}-container`, `${prefixCls}-bg-${background}`, {
        [`${prefixCls}-container-center`]: center,
        [`${prefixCls}-container-padding-vertical`]: paddingVertical,
      }),
    [hashId, className, prefixCls, background, center, paddingVertical],
  );

  const leftPart = useMemo((): React.ReactNode => {
    if (left === 'default' || !left) {
      return SwHeaderConfig.default;
    }

    if (left === 'logo') {
      return SwHeaderConfig.logo;
    }

    return left;
  }, [left, SwHeaderConfig.logo, SwHeaderConfig.default]);

  return wrapSSR(
    <div className={classNames(classNameExtend)}>
      {showLeftButton && (
        <div className={classNames(`${prefixCls}-left-part`)}>
          <Button type="ghost" schema="header" size='xs' icon={leftPart} onClick={onClickLeft} />
        </div>
      )}
      {!showLeftButton && !!rightButtons.length && center && (
        <div className={classNames(`${prefixCls}-left-part-min-width`)} />
      )}
      <div className={classNames(`${prefixCls}-center-part`)}>{children}</div>
      <div
        className={classNames(`${prefixCls}-right-part`, {
          [`${prefixCls}-right-part-no-content`]: !rightButtons.length,
          [`${prefixCls}-right-part-min-width`]: !rightButtons.length && center && showLeftButton,
        })}
      >
        {rightButtons.map((args, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Button key={index} type="ghost" schema='header' size='xs' {...args} />
        ))}
      </div>
    </div>,
  );
};

export default SwHeader;
