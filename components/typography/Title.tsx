import * as React from 'react';
import warning from '../_util/warning';
import type { BlockProps } from './Base';
import Base from './Base';

const TITLE_ELE_LIST = [1, 2, 3, 4, 5, 6] as const;
type SuperLevelType = 1 | 2 | 3;

export interface TitleProps
  extends Omit<BlockProps<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>, 'strong'>,
    Omit<
      React.HTMLAttributes<HTMLHeadElement>,
      'type' | keyof BlockProps<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>
    > {
  level?: typeof TITLE_ELE_LIST[number];
  superLevel?: SuperLevelType;
}

const Title = React.forwardRef<HTMLElement, TitleProps>((props, ref) => {
  const { level = 1, superLevel, className, ...restProps } = props;
  let component: keyof JSX.IntrinsicElements;
  let _className = className || '';

  if (TITLE_ELE_LIST.includes(level)) {
    component = `h${level}`;
  } else {
    warning(
      false,
      'Typography.Title',
      'Title only accept `1 | 2 | 3 | 4 | 5 | 6` as `level` value',
    );
    component = 'h1';
  }

  if (superLevel) {
    _className += ` -super-level-${superLevel}`;
  }

  return (
    <Base ref={ref} {...restProps} component={component} className={_className || undefined} />
  );
});

export default Title;
