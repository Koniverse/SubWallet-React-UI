import * as React from 'react';
import Identicon from '@polkadot/react-identicon';
import type { IconTheme } from '@polkadot/react-identicon/types';
import classNames from 'classnames';
import type { IconProps, IconWeight } from 'phosphor-react';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import type { AntIconType } from '../icon/stories/icon.stories';
import type { SizeType } from '../config-provider/SizeContext';
import Icon from '../icon';
import useStyle from './style';
import { ConfigContext } from '../config-provider';

export interface SwAvatarProps {
  theme: IconTheme;
  size: number;
  value: string | null;
  prefix: number;
  isShowSubIcon: boolean;
  subIconType: 'fontAwesome' | 'phosphor' | 'antDesignIcon';
  phosphorIcon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
  fontawesomeIcon?: IconProp;
  antDesignIcon?: AntIconType;
  subIconSize?: SizeType;
  iconColor?: string;
  iconWeight?: IconWeight;
}

const SwAvatar = ({
  size,
  value,
  prefix,
  theme,
  isShowSubIcon,
  subIconType,
  phosphorIcon,
  fontawesomeIcon,
  antDesignIcon,
  subIconSize,
  iconColor,
  iconWeight,
}: SwAvatarProps) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('sw-avatar');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const classes = classNames(prefixCls, hashId);
  return wrapSSR(
    <div className={classes} style={{ padding: size * 0.1, borderWidth: size * 0.05 }}>
      <Identicon className="icon" size={size * 0.7} value={value} prefix={prefix} theme={theme} />
      {isShowSubIcon && (
        <div className="sub-icon">
          <Icon
            type={subIconType}
            phosphorIcon={phosphorIcon}
            fontawesomeIcon={fontawesomeIcon}
            antDesignIcon={antDesignIcon}
            size={subIconSize}
            iconColor={iconColor}
            weight={iconWeight}
          />
        </div>
      )}
    </div>,
  );
};

export default SwAvatar;
