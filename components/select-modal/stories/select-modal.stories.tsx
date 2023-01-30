import { CheckCircle } from 'phosphor-react';
import React, { useCallback, useMemo, useState } from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import SwAvatar from '../../sw-avatar';
import { useToken } from '../../theme/internal';
import SelectModal from '../index';
import type { SelectModalProps } from '../index';
import Icon from '../../icon';
import Typography from '../../typography';

interface WrapperProps<T extends Record<string, any>> extends SelectModalProps<T> {
  suffixType: number;
  prefixType: number;
}

interface Item {
  label: string;
  value: string;
}

const items: Item[] = [];

for (let i = 0; i < 5; i++) {
  items.push({ value: i.toString(), label: i.toString() });
}

const icon = <SwAvatar value="" identPrefix={42} isAllAccount size={20} />;

const Wrapper = <T extends Record<string, any>>({
  suffixType = 1,
  prefixType = 0,
  ...args
}: WrapperProps<T>) => {
  const [selected, setSelected] = useState<string>('');
  const [, token] = useToken();

  const renderSelected = useCallback(
    (item: Item) => (
      <Typography.Text style={{ color: token.colorText }}>{item.value}</Typography.Text>
    ),
    [],
  );

  const renderItem = useCallback(
    (item: Item, _selected: boolean) => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <Typography.Text style={{ color: token.colorText }}>{item.value}</Typography.Text>
        {_selected && (
          <Icon
            type="phosphor"
            phosphorIcon={CheckCircle}
            iconColor={token.colorSecondary}
            size="sm"
            weight="fill"
          />
        )}
      </div>
    ),
    [],
  );

  const _onSelect = useCallback((value: string) => {
    setSelected(value);
  }, []);

  const additionalProps = useMemo((): Pick<
    SelectModalProps<T>,
    'prefix' | 'suffix' | 'hideSuffix'
  > => {
    const result: Pick<SelectModalProps<T>, 'prefix' | 'suffix' | 'hideSuffix'> = {};

    switch (prefixType) {
      case 1:
        result.prefix = icon;
        break;
      default:
        break;
    }

    switch (suffixType) {
      case 0:
        result.hideSuffix = true;
        break;
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
      {/* @ts-ignore */}
      <SelectModal
        {...args}
        {...additionalProps}
        items={items}
        renderSelected={renderSelected}
        renderItem={renderItem}
        itemKey="value"
        selected={selected}
        onSelect={_onSelect}
        id="test-select-modal"
      />
    </div>
  );
};

export default {
  title: 'Modal/SelectModal',
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
    maskClosable: {
      type: 'boolean',
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
    withDisabled: {
      control: false,
    },
    suffixType: {
      control: false,
    },
    prefixType: {
      control: false,
    },
  },
  // @ts-ignore
} as ComponentMeta<typeof Wrapper>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// @ts-ignore
const Template: ComponentStory<typeof Wrapper> = ({ ...args }) => <Wrapper {...args} />;

const DEFAULT_ARGS = {
  maskClosable: false,
  shape: 'default',
  background: 'default',
  size: 'medium',
  placeholder: 'Select Box',
  title: 'Select modal',
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

export const Disabled = Template.bind({});

Disabled.args = {
  ...DEFAULT_ARGS,
  disabled: true,
  withDisabled: true,
};

export const HideSuffix = Template.bind({});

HideSuffix.args = {
  ...DEFAULT_ARGS,
  suffixType: 0,
};

export const CustomSuffix = Template.bind({});

CustomSuffix.args = {
  ...DEFAULT_ARGS,
  suffixType: 2,
};

export const CustomPrefix = Template.bind({});

CustomPrefix.args = {
  ...DEFAULT_ARGS,
  prefixType: 1,
};

export const FullCustom = Template.bind({});

FullCustom.args = {
  ...DEFAULT_ARGS,
  suffixType: 2,
  prefixType: 1,
  label: 'Label',
};
