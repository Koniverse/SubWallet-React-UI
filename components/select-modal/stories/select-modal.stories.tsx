import { Camera, CheckCircle } from 'phosphor-react';
import React, { useCallback, useMemo, useState } from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import SettingItem from '../../web3-block/setting-item';
import SwAvatar from '../../sw-avatar';
import { useToken } from '../../theme/internal';
import SelectModal from '../index';
import type { SelectModalProps } from '../index';
import Icon from '../../icon';
import Typography from '../../typography';
import Button from '../../button';

interface WrapperProps<T extends Record<string, any>> extends SelectModalProps<T> {
  suffixType: number;
  prefixType: number;
  custom: boolean;
  withSearch: boolean;
}

interface Item {
  label: string;
  value: string;
}

const items: Item[] = [];

for (let i = 0; i < 20; i++) {
  items.push({ value: i.toString(), label: i.toString() });
}

const icon = <SwAvatar value="" identPrefix={42} size={20} />;

const Wrapper = <T extends Record<string, any>>({
  suffixType = 1,
  prefixType = 0,
  custom,
  withSearch,
  ...args
}: WrapperProps<T>) => {
  const [selected, setSelected] = useState<string>('');
  const [, token] = useToken();

  const onSearch = useCallback(
    (item: Item, searchText: string): boolean =>
      item.label.includes(searchText) || item.value.includes(searchText),
    [],
  );

  const renderSelected = useCallback(
    (item: Item) => (
      <Typography.Text style={{ color: token.colorText }}>{item.value}</Typography.Text>
    ),
    [],
  );

  const renderItem = useCallback(
    (item: Item, _selected: boolean) => (
      <SettingItem
        name={item.value}
        rightItem={
          _selected && (
            <Icon
              type="phosphor"
              phosphorIcon={CheckCircle}
              iconColor={token.colorSecondary}
              size="sm"
              weight="fill"
            />
          )
        }
      />
    ),
    [],
  );

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
      <SelectModal
        {...args}
        {...additionalProps}
        items={items}
        renderSelected={renderSelected}
        customInput={
          custom && (
            <Button
              schema="secondary"
              icon={<Icon type='phosphor' phosphorIcon={Camera} weight="fill" />}
            />
          )
        }
        renderItem={renderItem}
        itemKey="value"
        selected={selected}
        onSelect={setSelected}
        id="test-select-modal"
        searchFunction={withSearch ? onSearch : undefined}
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
    withSearch: {
      control: false,
    },
    searchPlaceholder: {
      control: {
        if: {
          arg: 'withSearch',
          eq: true,
        },
      },
    },
    searchableMinCharactersCount: {
      control: {
        if: {
          arg: 'withSearch',
          eq: true,
        },
      },
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

export const CustomInput = Template.bind({});

CustomInput.args = {
  ...DEFAULT_ARGS,
  custom: true,
};

export const WithSearch = Template.bind({});

WithSearch.args = {
  ...DEFAULT_ARGS,
  withSearch: true,
  searchableMinCharactersCount: 2,
  searchPlaceholder: 'Search',
};
