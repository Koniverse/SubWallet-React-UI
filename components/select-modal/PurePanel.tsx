import { faXmark } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { Panel } from 'rc-dialog';
import type { PanelProps } from 'rc-dialog/lib/Dialog/Content/Panel';
import * as React from 'react';
import Icon from '../icon';
import { ConfigContext } from '../config-provider';
import useStyle from './style';

export interface PurePanelProps extends Omit<PanelProps, 'prefixCls'> {
  prefixCls?: string;
  style?: React.CSSProperties;
}

export function renderCloseIcon(prefixCls: string, closeIcon?: React.ReactNode) {
  return (
    <span className={`${prefixCls}-close-x`}>
      {closeIcon || <Icon type="fontAwesome" fontawesomeIcon={faXmark} size="md" />}
    </span>
  );
}

export default function PurePanel(props: PurePanelProps) {
  const {
    prefixCls: customizePrefixCls,
    className,
    closeIcon,
    closable,
    title,
    children,
    ...restProps
  } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = customizePrefixCls || getPrefixCls('modal');

  const [, hashId] = useStyle(prefixCls);

  // Choose target props by confirm mark
  let additionalProps: Partial<PanelProps> = {};
  additionalProps = {
    closable: closable ?? true,
    title,
    footer: props.footer,
    children,
  };

  return (
    <Panel
      prefixCls={prefixCls}
      className={classNames(hashId, `${prefixCls}-pure-panel`, className)}
      {...restProps}
      closeIcon={renderCloseIcon(prefixCls, closeIcon)}
      closable={closable}
      {...additionalProps}
    />
  );
}
