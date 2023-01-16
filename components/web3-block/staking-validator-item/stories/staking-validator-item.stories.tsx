import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import StakingValidatorItem from '..';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'SubWallet Components/StakingValidatorItem',
  component: StakingValidatorItem,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    validatorAddress: {
      control: 'text',
      defaultValue: '5HbcGs2QXVAc6Q6eoTzLYNAJWpN17AkCFRLnWDaHCiGYXvNc',
    },
    validatorName: { control: 'text', defaultValue: 'Polkadot' },
    identPrefix: { control: 'number', defaultValue: 42 },
    avatarTheme: { control: 'radio', options: ['polkadot', 'ethereum'], defaultValue: 'polkadot' },
    expectedReturn: { control: 'number', defaultValue: 12.5 },
  },
} as ComponentMeta<typeof StakingValidatorItem>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof StakingValidatorItem> = (args) => (
  <StakingValidatorItem {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  extraComponent: (
    <div style={{ paddingTop: 8 }}>
      <div style={{ display: 'flex', paddingBottom: 2 }}>
        <div
          style={{
            fontSize: '12px',
            lineHeight: '20px',
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.45)',
            minWidth: 72,
            paddingRight: 8,
          }}
        >
          Total stake:{' '}
        </div>
        <span
          style={{
            fontSize: '12px',
            lineHeight: '20px',
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.85)',
          }}
        >
          2.93M DOT
        </span>
      </div>
      <div style={{ display: 'flex', paddingBottom: 2 }}>
        <div
          style={{
            fontSize: '12px',
            lineHeight: '20px',
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.45)',
            minWidth: 72,
            paddingRight: 8,
          }}
        >
          Min stake:{' '}
        </div>
        <span
          style={{
            fontSize: '12px',
            lineHeight: '20px',
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.85)',
          }}
        >
          10 DOT
        </span>
      </div>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            fontSize: '12px',
            lineHeight: '20px',
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.45)',
            minWidth: 72,
            paddingRight: 8,
          }}
        >
          Users:{' '}
        </div>
        <span
          style={{
            fontSize: '12px',
            lineHeight: '20px',
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.85)',
          }}
        >
          326
        </span>
      </div>
    </div>
  ),
};
