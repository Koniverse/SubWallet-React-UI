import classNames from 'classnames';
import { CaretLeft } from 'phosphor-react';
import React, { useMemo } from 'react';
import SwHeader from '../sw-header';
import type { SwHeaderProps } from '../sw-header';
import Icon from '../icon';
import useStyle from './style';
import { ConfigContext } from '../config-provider';
import Typography from '../typography';

export interface SwSubHeaderProps
  extends Omit<SwHeaderProps, 'showLeftButton' | 'onClickLeft' | 'children' | 'left'> {
  showBackButton?: boolean;
  onBack?: () => void;
  title?: string | React.ReactNode;
}

const BackIcon = <Icon type="phosphor" phosphorIcon={CaretLeft} size="xs" />;

const SwSubHeader: React.FC<SwSubHeaderProps> = (props) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const {
    prefixCls: customizePrefixCls,
    showBackButton,
    onBack,
    title,
    className,
    center,
    ...restProps
  } = props;

  const prefixCls = getPrefixCls('sw-sub-header', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const classNameExtend = useMemo(
    (): string =>
      classNames(hashId, className, `${prefixCls}-container`, {
        [`${prefixCls}-container-center`]: center,
      }),
    [hashId, className, prefixCls, center],
  );

  return wrapSSR(
    <SwHeader
      {...restProps}
      className={classNameExtend}
      left={BackIcon}
      showLeftButton={showBackButton}
      onClickLeft={onBack}
      center={center}
    >
      <div
        className={classNames(`${prefixCls}-title`, {
          [`${prefixCls}-center-part-pl`]: !showBackButton && !center,
        })}
      >
        {typeof title === 'string' ? (
          <Typography.Text ellipsis className={classNames(`${prefixCls}-title-content`)}>
            {title}
          </Typography.Text>
        ) : (
          title
        )}
      </div>
    </SwHeader>,
  );
};

export default SwSubHeader;
