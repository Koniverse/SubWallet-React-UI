import React, { useMemo } from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import SwAvatar from '../../sw-avatar';
import Field from '../index';
import type { FieldProps } from '../index';

interface WrapperProps extends FieldProps {
  suffixType: number;
  prefixType: number;
}

const icon = <SwAvatar value="" identPrefix={42} size={20} />;

const Wrapper = ({ suffixType = 1, prefixType = 0, ...args }: WrapperProps) => {
  const additionalProps = useMemo((): Pick<FieldProps, 'prefix' | 'suffix'> => {
    const result: Pick<FieldProps, 'prefix' | 'suffix'> = {};

    switch (prefixType) {
      case 1:
        result.prefix = icon;
        break;
      default:
        break;
    }

    switch (suffixType) {
      case 2:
        result.suffix = icon;
        break;
      default:
        break;
    }

    return result;
  }, [suffixType, prefixType]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Field {...args} {...additionalProps} />
    </div>
  );
};

export default {
  title: 'Basic Components/Field',
  component: Wrapper,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    title: {
      type: 'string',
    },
    placeholder: {
      type: 'string',
    },
    label: {
      type: 'string',
      if: {
        arg: 'withLabel',
        eq: true,
      },
    },
    shape: {
      control: 'radio',
      options: ['default', 'square', 'round'],
    },
    background: {
      control: 'radio',
      options: ['default', 'transparent'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      if: {
        arg: 'label',
        eq: '',
      },
    },
    disabled: {
      type: 'boolean',
      if: {
        arg: 'withDisabled',
        eq: true,
      },
    },
    withLabel: {
      control: false,
    },
    suffixType: {
      control: false,
    },
    prefixType: {
      control: false,
    },
    maxLine: {
      type: 'number',
      defaultValue: 1,
    },
  },
  // @ts-ignore
} as ComponentMeta<typeof Wrapper>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// @ts-ignore
const Template: ComponentStory<typeof Wrapper> = ({ ...args }) => <Wrapper {...args} />;

const DEFAULT_ARGS = {
  shape: 'default',
  background: 'default',
  size: 'medium',
  placeholder: 'Placeholder',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet corporis cumque deleniti dicta distinctio dolores ea est et eveniet ipsam iste molestiae non possimus, recusandae rem sint. Cumque, eum?',
  disabled: false,
  label: '',
};
export const Default = Template.bind({});

Default.args = {
  ...DEFAULT_ARGS,
};

export const WithLabel = Template.bind({});

WithLabel.args = {
  ...DEFAULT_ARGS,
  label: 'Label',
  withLabel: true,
};
export const CustomSuffix = Template.bind({});

CustomSuffix.args = {
  ...DEFAULT_ARGS,
  suffixType: 2,
  label: 'Label',
  withLabel: true,
};

export const CustomPrefix = Template.bind({});

CustomPrefix.args = {
  ...DEFAULT_ARGS,
  prefixType: 1,
  label: 'Label',
  withLabel: true,
};

export const FullCustom = Template.bind({});

FullCustom.args = {
  ...DEFAULT_ARGS,
  suffixType: 2,
  prefixType: 1,
  label: 'Label',
  withLabel: true,
};
