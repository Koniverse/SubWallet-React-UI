import classNames from 'classnames';
import { CaretLeft } from 'phosphor-react';
import React, { useMemo } from 'react';
import Icon from '../icon';
import useStyle from './style';
import { ConfigContext } from '../config-provider';
import type { ButtonProps } from '../button';
import Button from '../button';
import Typography from '../typography';

export type SwSubHeaderBackground = 'default' | 'transparent';
export interface SwSubHeaderProps {
  prefixCls?: string;
  className?: string;
  background?: SwSubHeaderBackground;
  center?: boolean;
  showBackButton?: boolean;
  onBack?: () => void;
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
    showBackButton,
    onBack,
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
      {showBackButton && (
        <div className={classNames(`${prefixCls}-left-part`)}>
          <Button
            type="ghost"
            size='xs'
            icon={<Icon type="phosphor" phosphorIcon={CaretLeft} size="sm" />}
            onClick={onBack}
          />
        </div>
      )}
      {!showBackButton && !!rightButtons.length && center && (
        <div className={classNames(`${prefixCls}-left-part-min-width`)} />
      )}
      <div
        className={classNames(`${prefixCls}-center-part`, {
          [`${prefixCls}-center-part-pl`]: !showBackButton && !center,
        })}
      >
        <div className={classNames(`${prefixCls}-title`)}>
          {typeof title === 'string' ? (
            <Typography.Text ellipsis className={classNames(`${prefixCls}-title-content`)}>
              {title}
            </Typography.Text>
          ) : (
            title
          )}
        </div>
      </div>
      <div
        className={classNames(`${prefixCls}-right-part`, {
          [`${prefixCls}-right-part-no-content`]: !rightButtons.length,
          [`${prefixCls}-right-part-min-width`]: !rightButtons.length && center && showBackButton,
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
