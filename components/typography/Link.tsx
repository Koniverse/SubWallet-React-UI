import * as React from 'react';
import warning from '../_util/warning';
import type { BlockProps } from './Base';
import Base from './Base';

export interface LinkProps
  extends BlockProps<'a'>,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'type' | keyof BlockProps<'a'>> {
  ellipsis?: boolean;
  icon?: React.ReactNode;
}

const Link = React.forwardRef<HTMLElement, LinkProps>(
  ({ ellipsis, icon, children, rel, ...restProps }, ref) => {
    warning(
      typeof ellipsis !== 'object',
      'Typography.Link',
      '`ellipsis` only supports boolean value.',
    );

    const mergedProps = {
      ...restProps,
      rel: rel === undefined && restProps.target === '_blank' ? 'noopener noreferrer' : rel,
    };

    // @ts-expect-error: https://github.com/ant-design/ant-design/issues/26622
    delete mergedProps.navigate;

    let _children = children;

    if (icon) {
      _children = (
        <>
          {icon}
          <span>{children}</span>
        </>
      );
    }

    return (
      <Base {...mergedProps} editable={false} ref={ref} ellipsis={!!ellipsis} component="a">
        {_children}
      </Base>
    );
  },
);

export default Link;
