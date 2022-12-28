import omit from 'rc-util/lib/omit';
import * as React from 'react';
import classNames from 'classnames';
import warning from '../_util/warning';
import type { BlockProps, EllipsisConfig } from './Base';
import Base from './Base';

export type TextSizeType = 'xs' | 'sm' | 'md' | 'lg';

export interface TextProps
  extends BlockProps<'span'>,
    Omit<React.HTMLAttributes<HTMLSpanElement>, 'type' | keyof BlockProps<'span'>> {
  ellipsis?: boolean | Omit<EllipsisConfig, 'expandable' | 'rows' | 'onExpand'>;
  size?: TextSizeType;
  monospace?: boolean;
}

const Text: React.ForwardRefRenderFunction<HTMLSpanElement, TextProps> = (
  { ellipsis, size = '', monospace, className, ...restProps },
  ref,
) => {
  const mergedEllipsis = React.useMemo(() => {
    if (ellipsis && typeof ellipsis === 'object') {
      return omit(ellipsis as any, ['expandable', 'rows']);
    }

    return ellipsis;
  }, [ellipsis]);

  warning(
    typeof ellipsis !== 'object' ||
      !ellipsis ||
      (!('expandable' in ellipsis) && !('rows' in ellipsis)),
    'Typography.Text',
    '`ellipsis` do not support `expandable` or `rows` props.',
  );

  const _classNames = classNames(className, {
    [`-size-${size}`]: !!size,
    [`-monospace`]: !!monospace,
  });

  return (
    <Base
      ref={ref}
      {...restProps}
      ellipsis={mergedEllipsis}
      component="span"
      className={_classNames}
    />
  );
};

export default React.forwardRef(Text);
