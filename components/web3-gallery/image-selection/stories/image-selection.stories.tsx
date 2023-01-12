import React, { useState } from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import ItemSelection from '..';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'SubWallet Components/Image Selection',
  component: ItemSelection,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ItemSelection>;

const blockList: string[] = Array.from(Array(10).keys()).map((i) => `${i + 1}`);

const App = () => {
  const [selectedItemMap, setSelectedItemMap] = useState<Record<string, boolean>>({});

  return (
    <div style={{ display: 'grid', gridGap: '16px', gridTemplateColumns: 'auto auto auto' }}>
      {blockList.map((i) => (
        <ItemSelection
          key={i}
          imageSource='https://www.w3schools.com/css/paris.jpg'
          title={`Item ${i}`}
          onClick={() => {
            setSelectedItemMap((prevState) => ({
              ...prevState,
              [i]: !prevState[i],
            }));
          }}
          isSelected={selectedItemMap[i]}
        />
      ))}
    </div>
  );
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof App> = () => <App />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
