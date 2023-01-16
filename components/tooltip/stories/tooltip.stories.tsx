import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import type { TooltipPlacement } from '..';
import Tooltip from '..';
import Button from '../../button';

interface AppProps {
  tooltipPosition: TooltipPlacement;
  tooltipTitle: string;
}

function getContainerStyle(tooltipPosition: TooltipPlacement): React.CSSProperties {
  const style: React.CSSProperties = {
    height: 400,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 16,
  };

  if (
    ['top', 'topLeft', 'topRight', 'bottom', 'bottomLeft', 'bottomRight'].includes(tooltipPosition)
  ) {
    style.justifyContent = 'center';
  } else if (['left', 'leftTop', 'leftBottom'].includes(tooltipPosition)) {
    style.justifyContent = 'flex-end';
  } else if (['right', 'rightTop', 'rightBottom'].includes(tooltipPosition)) {
    style.justifyContent = 'flex-start';
  }

  return style;
}

const App = ({ tooltipPosition, tooltipTitle }: AppProps) => (
  <div style={getContainerStyle(tooltipPosition)}>
    <Tooltip placement={tooltipPosition} title={tooltipTitle}>
      <Button>Hover me!</Button>
    </Tooltip>
  </div>
);

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Basic Components/Tooltip',
  component: App,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    tooltipPosition: {
      table: {
        disable: true,
      },
    },
    tooltipTitle: {
      control: 'text',
      defaultValue:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare',
    },
  },
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App {...args} />;

export const Top = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Top.args = {
  tooltipPosition: 'top',
};

export const Left = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Left.args = {
  tooltipPosition: 'left',
};

export const Right = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Right.args = {
  tooltipPosition: 'right',
};

export const Bottom = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Bottom.args = {
  tooltipPosition: 'bottom',
};

export const TopLeft = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TopLeft.args = {
  tooltipPosition: 'topLeft',
};

export const TopRight = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TopRight.args = {
  tooltipPosition: 'topRight',
};

export const BottomLeft = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
BottomLeft.args = {
  tooltipPosition: 'bottomLeft',
};

export const BottomRight = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
BottomRight.args = {
  tooltipPosition: 'bottomRight',
};

export const LeftTop = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
LeftTop.args = {
  tooltipPosition: 'leftTop',
};

export const LeftBottom = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
LeftBottom.args = {
  tooltipPosition: 'leftBottom',
};

export const RightTop = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
RightTop.args = {
  tooltipPosition: 'rightTop',
};

export const RightBottom = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
RightBottom.args = {
  tooltipPosition: 'rightBottom',
};
