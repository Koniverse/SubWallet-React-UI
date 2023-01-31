import * as React from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';
import InnerLogo from './InnerLogo';
import type { PresetIconShapeType } from '../_util/shapes';
import useStyle from './style';

export interface LogoProps {
  size: number;
  shape?: PresetIconShapeType;
  subLogoShape?: PresetIconShapeType;
  isShowSubLogo?: boolean;
  network?: string;
  subNetwork?: string;
  token?: string;
  subToken?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  size,
  network,
  subNetwork,
  token,
  subToken,
  shape = 'circle',
  subLogoShape = 'circle',
  isShowSubLogo,
  className,
}: LogoProps) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('logo');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const classes = classNames(prefixCls, hashId);
  const getSubLogo = () => (
    <div className="-sub-logo">
      {isShowSubLogo && (
        <InnerLogo shape={subLogoShape} size={size / 2.5} network={subNetwork} token={subToken} />
      )}
    </div>
  );

  return wrapSSR(
    <div className={`${classes} ${className}`}>
      <InnerLogo shape={shape} size={size} network={network} token={token} />
      {getSubLogo()}
    </div>,
  );
};

export default Logo;
