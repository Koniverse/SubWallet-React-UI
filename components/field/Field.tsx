import classNames from 'classnames';
import React from 'react';
import type { PresetBarShapeType } from '../_util/shapes';
import { ConfigContext } from '../config-provider';
import { NoFormStyle } from '../form/context';
import { NoCompactStyle } from '../space/Compact';
import useStyle from './style';
import Typography from '../typography';

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
  maxLine?: number;
}

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
  } = props;

  const prefixCls = getPrefixCls('field', customizePrefixCls);
  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls);

  return wrapSSR(
    <NoCompactStyle>
      <NoFormStyle status override>
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
          )}
          style={{ width }}
        >
          {label && <div className={classNames(`${prefixCls}-label`)}>{label}</div>}
          <div className={classNames(`${prefixCls}-wrapper`)}>
            {prefix}
            <div className={classNames(`${prefixCls}-content-wrapper`)}>
              <Typography.Paragraph
                className={classNames(`${prefixCls}-content`)}
                ellipsis={{ rows: maxLine }}
              >
                {content || placeholder || DEFAULT_PLACEHOLDER}
              </Typography.Paragraph>
            </div>
            {suffix}
          </div>
        </div>
      </NoFormStyle>
    </NoCompactStyle>,
  );
};

export default Field;
