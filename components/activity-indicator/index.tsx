import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import CSSMotion from 'rc-motion';
import React from 'react';
import { ConfigContext } from '../config-provider';

export interface ActivityIndicatorProps {
  prefixCls?: string;
  existIcon?: boolean;
  loading?: boolean | object;
  loadingIconColor?: string;
  size?: number | string;
}
const getCollapsedWidth = () => ({ width: 0, opacity: 0, transform: 'scale(0)' });
const getRealWidth = (node: HTMLElement) => ({
  width: node.scrollWidth,
  opacity: 1,
  transform: 'scale(1)',
});

const ActivityIndicator: React.FC<ActivityIndicatorProps> = ({
  prefixCls: customizePrefixCls,
  loading = true,
  existIcon = true,
  loadingIconColor = '#737373',
  size,
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('activity-indicator', customizePrefixCls);

  const visible = !!loading;

  if (existIcon) {
    return (
      <span className={`${prefixCls}-loading-icon`} style={{ color: loadingIconColor }}>
        <LoadingOutlined color={loadingIconColor} style={{ fontSize: size }} />
      </span>
    );
  }

  return (
    <CSSMotion
      visible={visible}
      // We do not really use this motionName
      motionName={`${prefixCls}-loading-icon-motion`}
      removeOnLeave
      onAppearStart={getCollapsedWidth}
      onAppearActive={getRealWidth}
      onEnterStart={getCollapsedWidth}
      onEnterActive={getRealWidth}
      onLeaveStart={getRealWidth}
      onLeaveActive={getCollapsedWidth}
    >
      {({ className, style }: { className?: string; style?: React.CSSProperties }, ref: any) => (
        <span className={`${prefixCls}-loading-icon`} style={style} ref={ref}>
          <LoadingOutlined
            className={className}
            style={{ fontSize: size }}
            color={loadingIconColor}
          />
        </span>
      )}
    </CSSMotion>
  );
};

export default ActivityIndicator;
