import * as React from 'react';
import classNames from 'classnames';
import { CheckCircle } from 'phosphor-react';
import { ConfigContext } from '../../config-provider';
import useStyle from './style';
import type { Web3GalleryProps } from '../base';
import Web3Gallery from '../base';
import Icon from '../../icon';

export interface ItemSelectionProps extends Omit<Web3GalleryProps, 'footerNode' | 'appendNode'> {
  isSelected?: boolean;
  title: string;
}

const ItemSelection: React.FC<ItemSelectionProps> = ({
  className,
  isSelected,
  title,
  ...restProps
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('item-selection');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const classes = classNames(prefixCls, className, hashId, {
    '-is-selected': isSelected,
  });

  return wrapSSR(
    <Web3Gallery
      {...restProps}
      className={classes}
      appendNode={
        <div className="__overlay">
          <Icon phosphorIcon={CheckCircle} weight="fill" className="__check-icon" />

          <div className="__item-title">{title}</div>
        </div>
      }
    />,
  );
};

export default ItemSelection;
