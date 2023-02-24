
import {CheckCircle, Info, X, XCircle} from 'phosphor-react';
import React from 'react';
import classNames from "classnames";
import BackgroundIcon from '../background-icon';
import {ConfigContext} from "../config-provider";
import useStyle from "./style";
import Button from '../button';
import Icon from "../icon";

export interface SwAlertProps {
  className?: string;
  type?: 'info' | 'warning' | 'danger' | 'success';
  title: string;
  description?: string;
  onClickCloseBtn?: () => void;
}

const SwAlert: React.FC<SwAlertProps> = (props: SwAlertProps) => {
  const { className, description, title, type = 'info', onClickCloseBtn } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('sw-alert');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const classes = classNames(prefixCls, hashId, className, `${prefixCls}-${type}`, {
    '-with-bordered': !description,
  });

  const getPhosphorIcon = () => {
    if (type === 'info' || type === 'warning') {
      return Info;
    }
    if (type === 'success') {
      return CheckCircle;
    }
      return XCircle;
  }

  return wrapSSR(
    <div className={classes}>
      <div className={`${prefixCls}-icon`}>
        <BackgroundIcon
          backgroundColor='var(--bg-color)'
          iconColor='var(--icon-color)'
          phosphorIcon={getPhosphorIcon()}
          size={description ? 'lg' : 'sm'}
          weight='fill'
        />
      </div>
      <div className={`${prefixCls}-content`}>
        <div className={`${prefixCls}-title`}>{title}</div>
        {description && <div className={`${prefixCls}-description`}>{description}</div>}
      </div>
      {!description &&
        <Button
          className={`${prefixCls}-close-btn`}
          size='xs'
          type='ghost'
          icon={
            <Icon
              phosphorIcon={X}
              size='xs'
              iconColor='var(--icon-color)'
              weight='bold'
            />
          }
          onClick={onClickCloseBtn}
        />
      }
    </div>,
  );
};

export default SwAlert;
