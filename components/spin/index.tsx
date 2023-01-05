import classNames from 'classnames';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import useStyle from './style/index';

export interface SpinProps {
  prefixCls?: string;
  size?: number;
  color?: string;
}

const Spin: React.FC<SpinProps> = ({ prefixCls: customizePrefixCls, size, color = '#888' }) => {
  const { getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('spin', customizePrefixCls);

  const [wrapSSR, hashId] = useStyle(prefixCls);
  const className = classNames(prefixCls, hashId);

  return wrapSSR(
    <div className={className} style={{ width: size, height: size }}>
      <svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
        <g transform='rotate(0 50 50)'>
          <rect fill={color} height='16' rx='4' ry='4' width='8' x='46' y='22'>
            <animate
              attributeName='opacity'
              begin='-0.546875s'
              dur='0.625s'
              keyTimes='0;1'
              repeatCount='indefinite'
              values='1;0'
            />
          </rect>
        </g>
        <g transform='rotate(45 50 50)'>
          <rect fill={color} height='16' rx='4' ry='4' width='8' x='46' y='22'>
            <animate
              attributeName='opacity'
              begin='-0.46875s'
              dur='0.625s'
              keyTimes='0;1'
              repeatCount='indefinite'
              values='1;0'
            />
          </rect>
        </g>
        <g transform='rotate(90 50 50)'>
          <rect fill={color} height='16' rx='4' ry='4' width='8' x='46' y='22'>
            <animate
              attributeName='opacity'
              begin='-0.390625s'
              dur='0.625s'
              keyTimes='0;1'
              repeatCount='indefinite'
              values='1;0'
            />
          </rect>
        </g>
        <g transform='rotate(135 50 50)'>
          <rect fill={color} height='16' rx='4' ry='4' width='8' x='46' y='22'>
            <animate
              attributeName='opacity'
              begin='-0.3125s'
              dur='0.625s'
              keyTimes='0;1'
              repeatCount='indefinite'
              values='1;0'
            />
          </rect>
        </g>
        <g transform='rotate(180 50 50)'>
          <rect fill={color} height='16' rx='4' ry='4' width='8' x='46' y='22'>
            <animate
              attributeName='opacity'
              begin='-0.234375s'
              dur='0.625s'
              keyTimes='0;1'
              repeatCount='indefinite'
              values='1;0'
            />
          </rect>
        </g>
        <g transform='rotate(225 50 50)'>
          <rect fill={color} height='16' rx='4' ry='4' width='8' x='46' y='22'>
            <animate
              attributeName='opacity'
              begin='-0.15625s'
              dur='0.625s'
              keyTimes='0;1'
              repeatCount='indefinite'
              values='1;0'
            />
          </rect>
        </g>
        <g transform='rotate(270 50 50)'>
          <rect fill={color} height='16' rx='4' ry='4' width='8' x='46' y='22'>
            <animate
              attributeName='opacity'
              begin='-0.078125s'
              dur='0.625s'
              keyTimes='0;1'
              repeatCount='indefinite'
              values='1;0'
            />
          </rect>
        </g>
        <g transform='rotate(315 50 50)'>
          <rect fill={color} height='16' rx='4' ry='4' width='8' x='46' y='22'>
            <animate
              attributeName='opacity'
              begin='0s'
              dur='0.625s'
              keyTimes='0;1'
              repeatCount='indefinite'
              values='1;0'
            />
          </rect>
        </g>
      </svg>
    </div>,
  );
};

export default Spin;
