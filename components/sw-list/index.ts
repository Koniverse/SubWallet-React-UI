import type * as React from 'react';
import type { SwListProps } from './List';
import InternalList from './List';
import Section from './Section';

export type { SwListProps } from './List';
export type { SwListSectionProps } from './Section';

type CompoundedComponent<T = any> = React.ForwardRefExoticComponent<
  SwListProps<T> & React.RefAttributes<HTMLElement>
> & {
  Section: typeof Section;
};

const SwList = InternalList as CompoundedComponent;

SwList.Section = Section;

export default SwList;
