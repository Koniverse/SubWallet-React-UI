import classNames from 'classnames';
import { ArrowLeft } from 'phosphor-react';
import React, { useMemo } from 'react';
import Icon from '../icon';
import useStyle from './style';
import { ConfigContext } from '../config-provider';
import type { ButtonProps } from '../button';
import Button from '../button';

export interface SwSubHeaderProps {
  prefixCls?: string;
  className?: string;
  background?: 'default' | 'transparent';
  center?: boolean;
  showLeftButton?: boolean;
  onClickLeft?: () => void;
  rightButtons?: ButtonProps[];
  title?: string | React.ReactNode;
  paddingVertical?: boolean;
}

const SwSubHeader: React.FC<SwSubHeaderProps> = (props) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const {
    prefixCls: customizePrefixCls,
    className,
    background = 'default',
    center,
    showLeftButton,
    onClickLeft,
    rightButtons = [],
    title,
    paddingVertical,
  } = props;

  const prefixCls = getPrefixCls('sw-sub-header', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const classNameExtend = useMemo(
    (): string =>
      classNames(hashId, className, `${prefixCls}-container`, `${prefixCls}-bg-${background}`, {
        [`${prefixCls}-container-center`]: center,
        [`${prefixCls}-container-padding-vertical`]: paddingVertical,
      }),
    [hashId, className, prefixCls, background, center, paddingVertical],
  );

  return wrapSSR(
    <div className={classNames(classNameExtend)}>
      {showLeftButton && (
        <div className={classNames(`${prefixCls}-left-part`)}>
          <Button
            type="ghost"
            size='xs'
            icon={<Icon type="phosphor" phosphorIcon={ArrowLeft} size="sm" />}
            onClick={onClickLeft}
          />
        </div>
      )}
      <div
        className={classNames(`${prefixCls}-center-part`, {
          [`${prefixCls}-center-part-pl`]: !showLeftButton && !center,
        })}
      >
        {typeof title === 'string' ? (
          <span className={classNames(`${prefixCls}-title`)}>{title}</span>
        ) : (
          title
        )}
      </div>
      <div
        className={classNames(`${prefixCls}-right-part`, {
          [`${prefixCls}-right-part-no-content`]: !rightButtons.length,
          [`${prefixCls}-right-part-min-width`]: !rightButtons.length && center && showLeftButton,
        })}
      >
        {rightButtons.map((args, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Button key={index} {...args} type="ghost" size='xs' />
        ))}
      </div>
    </div>,
  );
};

export default SwSubHeader;
