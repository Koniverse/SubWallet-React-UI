import { CheckCircle, WarningCircle, XCircle } from 'phosphor-react';
import classNames from 'classnames';
import React, { useContext } from 'react';
import Icon from '../icon';
import type { SwIconProps } from '../icon';
import { getMergedStatus, getStatusClassNames } from '../_util/statusUtils';
import type { InputStatus } from '../_util/statusUtils';
import type { PresetBarShapeType } from '../_util/shapes';
import { ConfigContext } from '../config-provider';
import { FormItemInputContext } from '../form/context';
import useStyle from './style';
import Typography from '../typography';
import Tooltip from '../tooltip';
import type { TooltipPlacement } from '../tooltip';

export type SelectModalSize = 'small' | 'medium';

export interface FieldProps {
  content: React.ReactNode;
  prefixCls?: string;
  className?: string;
  size?: SelectModalSize;
  shape?: PresetBarShapeType;
  placeholder?: string;
  background?: 'default' | 'transparent';
  width?: number | string;
  label?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  status?: InputStatus;
  statusHelp?: string;
  maxLine?: number;
  tooltip?: string;
  tooltipPlacement?: TooltipPlacement;
  displaySuccessStatus?: boolean;
}

const StatusIconMap: Record<string, SwIconProps['phosphorIcon']> = {
  success: CheckCircle,
  error: XCircle,
  warning: WarningCircle,
};

const DEFAULT_PLACEHOLDER = 'Placeholder';

const Field = (props: FieldProps): JSX.Element => {
  const { getPrefixCls } = React.useContext(ConfigContext);

  const {
    prefixCls: customizePrefixCls,
    className,
    shape = 'default',
    background = 'default',
    width = '100%',
    label = '',
    suffix,
    prefix,
    size: inputSize = 'medium',
    content,
    placeholder,
    maxLine = 1,
    tooltipPlacement = 'topLeft',
    tooltip,
    statusHelp,
    status: customStatus,
    displaySuccessStatus,
  } = props;

  const prefixCls = getPrefixCls('field', customizePrefixCls);
  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const { status: contextStatus } = useContext(FormItemInputContext);
  const mergedStatus = getMergedStatus(contextStatus, customStatus);

  const suffixNode = (!!mergedStatus || suffix) && (
    <>
      {!!mergedStatus && (mergedStatus !== 'success' || displaySuccessStatus) && (
        <Icon
          phosphorIcon={StatusIconMap[mergedStatus]}
          weight='fill'
          className={`${prefixCls}-status-icon`}
        />
      )}
      {suffix}
    </>
  );

  return wrapSSR(
    <Tooltip trigger='hover' title={statusHelp || tooltip} placement={tooltipPlacement}>
      <div
        className={classNames(
          hashId,
          className,
          `${prefixCls}-container`,
          `${prefixCls}-border-${shape}`,
          `${prefixCls}-bg-${background}`,
          `${prefixCls}-size-${inputSize}`,
          {
            [`${prefixCls}-with-label`]: label,
            [`${prefixCls}-placeholder`]: !content,
          },
          getStatusClassNames('', mergedStatus),
        )}
        style={{ width }}
      >
        {label && <div className={classNames(`${prefixCls}-label`)}>{label}</div>}
        <div className={classNames(`${prefixCls}-wrapper`)}>
          {prefix && <div className={classNames(`${prefixCls}-prefix`)}>{prefix}</div>}
          <div className={classNames(`${prefixCls}-content-wrapper`)}>
            <Typography.Paragraph
              className={classNames(`${prefixCls}-content`)}
              ellipsis={{ rows: maxLine }}
            >
              {content || placeholder || DEFAULT_PLACEHOLDER}
            </Typography.Paragraph>
          </div>
          {suffixNode && <div className={classNames(`${prefixCls}-suffix`)}>{suffixNode}</div>}
        </div>
      </div>
    </Tooltip>,
  );
};

export default Field;
