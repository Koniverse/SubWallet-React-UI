import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Typography from 'antd/es/typography';
import React, { useCallback, useContext, useState } from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { SelectModalContext, SelectModalContextProvider } from '../provider';
import SelectModal from '../index';
import Icon from '../../icon';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Core/SelectModal',
  component: SelectModal,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    title: {
      type: 'string',
    },
    items: {
      if: {
        exists: false,
      },
    },
    itemKey: {
      if: {
        exists: false,
      },
    },
    selected: {
      if: {
        exists: false,
      },
    },
    renderItem: {
      if: {
        exists: false,
      },
    },
    renderSelected: {
      if: {
        exists: false,
      },
    },
    id: {
      if: {
        exists: false,
      },
    },
    onSelect: {
      if: {
        arg: 'neverCheck',
        exists: true,
      },
    },
  },
  // @ts-ignore
} as ComponentMeta<typeof SelectModal>;

interface Item {
  label: string;
  value: string;
}

const items: Item[] = [];

for (let i = 0; i < 20; i++) {
  items.push({ value: i.toString(), label: i.toString() });
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// @ts-ignore
const Wrapper: ComponentStory<typeof SelectModal> = ({ ...args }) => {
  const [selected, setSelected] = useState<string>('');
  const [selected2, setSelected2] = useState<string>('');

  const { activeModal } = useContext(SelectModalContext);

  const renderSelected = useCallback((item?: Item) => {
    if (!item) {
      return <Typography.Text style={{ color: 'white' }}>Select</Typography.Text>;
    }
    return <Typography.Text style={{ color: 'white' }}>{item.value}</Typography.Text>;
  }, []);

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
        <Typography.Text style={{ color: 'white' }}>{item.value}</Typography.Text>
        {_selected && (
          <Icon type="fontAwesome" fontawesomeIcon={faCheck} iconColor="#7CD383" size="xs" />
        )}
      </div>
    ),
    [],
  );

  const _onSelect = useCallback(
    (value: string) => {
      setSelected(value);
      activeModal('test-select-modal-2');
    },
    [activeModal],
  );

  const _onSelect2 = useCallback((value: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    setSelected2(value);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* @ts-ignore */}
      <SelectModal
        {...args}
        title="Select modal 1"
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
        title="Select modal 2"
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

// @ts-ignore
const Template: ComponentStory<typeof SelectModal> = ({ ...args }) => (
  <SelectModalContextProvider>
    <Wrapper {...args} />
  </SelectModalContextProvider>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  maskClosable: false,
  shape: 'default',
  background: 'default',
};
