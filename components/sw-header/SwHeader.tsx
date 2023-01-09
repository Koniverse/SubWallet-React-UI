import classNames from 'classnames';
import React, { useMemo } from 'react';
import useStyle from './style';
import { SwHeaderConfig } from './config';
import { ConfigContext } from '../config-provider';
import type { ButtonProps } from '../button';
import Button from '../button';

export interface SwHeaderProps {
  prefixCls?: string;
  className?: string;
  background?: 'default' | 'transparent';
  mergedLeft?: boolean;
  showLeftButton?: boolean;
  left?: React.ReactNode | 'logo' | 'default';
  onClickLeft?: () => void;
  rightButtons?: ButtonProps[];
  children?: React.ReactNode | React.ReactNode[];
}

const SwHeader: React.FC<SwHeaderProps> = (props) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const {
    prefixCls: customizePrefixCls,
    className,
    background = 'default',
    mergedLeft,
    left,
    showLeftButton,
    onClickLeft,
    rightButtons = [],
    children,
  } = props;

  const prefixCls = getPrefixCls('sw-header', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const classNameExtend = useMemo(
    (): string =>
      classNames(hashId, className, `${prefixCls}-container`, `${prefixCls}-bg-${background}`, {
        [`${prefixCls}-container-merged`]: mergedLeft,
      }),
    [hashId, className, prefixCls, background, mergedLeft],
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
          <Button type="ghost" size='xs' icon={leftPart} onClick={onClickLeft} />
        </div>
      )}
      <div className={classNames(`${prefixCls}-center-part`)}>{children}</div>
      <div className={classNames(`${prefixCls}-right-part`)}>
        {
          // eslint-disable-next-line react/no-array-index-key
          rightButtons.map((args, index) => (
            <Button key={index} {...args} type="ghost" size='xs' />
          ))
        }
      </div>
    </div>,
  );
};

export default SwHeader;
