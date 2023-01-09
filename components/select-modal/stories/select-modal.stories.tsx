import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Typography from 'antd/es/typography';
import React, { useCallback, useState } from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import SelectModal from '../index';
import Icon from '../../icon';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Modal/SelectModal',
  component: SelectModal,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    title: {
      type: 'string',
    },
    placeholder: {
      type: 'string',
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
      options: ['default', 'small', 'medium', 'large'],
    },
  },
  // @ts-ignore
} as ComponentMeta<typeof SelectModal>;

interface Item {
  label: string;
  value: string;
}

const items: Item[] = [];

for (let i = 0; i < 5; i++) {
  items.push({ value: i.toString(), label: i.toString() });
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// @ts-ignore
const Template: ComponentStory<typeof SelectModal> = ({ title, ...args }) => {
  const [selected, setSelected] = useState<string>('');
  const [selected2, setSelected2] = useState<string>('');

  const renderSelected = useCallback(
    (item: Item) => <Typography.Text style={{ color: 'white' }}>{item.value}</Typography.Text>,
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
          padding: '14px 12px',
          borderRadius: 8,
          backgroundColor: '#252525',
        }}
      >
        <Typography.Text style={{ color: 'white' }}>{item.value}</Typography.Text>
        {_selected && (
          <Icon type="fontAwesome" fontawesomeIcon={faCheck} iconColor="#7CD383" size="xs" />
        )}
      </div>
    ),
    [],
  );

  const _onSelect = useCallback((value: string) => {
    setSelected(value);
  }, []);

  const _onSelect2 = useCallback((value: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    setSelected2(value);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* @ts-ignore */}
      <SelectModal
        {...args}
        title={`${title} 1`}
        items={items}
        renderSelected={renderSelected}
        renderItem={renderItem}
        itemKey="value"
        selected={selected}
        onSelect={_onSelect}
        id="test-select-modal"
      />
      {/* @ts-ignore */}
      <SelectModal
        {...args}
        title={`${title} 2`}
        items={items}
        renderSelected={renderSelected}
        renderItem={renderItem}
        itemKey="value"
        selected={selected2}
        onSelect={_onSelect2}
        id="test-select-modal-2"
      />
    </div>
  );
};

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  maskClosable: false,
  shape: 'default',
  background: 'default',
  size: 'default',
  placeholder: 'Select Box',
  title: 'Select modal',
};
