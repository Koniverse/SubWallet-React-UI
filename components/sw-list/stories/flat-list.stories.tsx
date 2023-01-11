import React, { useCallback } from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import type { SwListSectionProps } from '..';
import SwList from '..';
import type { DemoAccountType } from './data';
import { DemoAccounts } from './data';
import AccountCard from '../../web3block/account-card';
import Divider from '../../divider';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Layout/SwList',
  component: SwList,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  decorators: [
    (Story: any) => (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          paddingTop: '1rem',
        }}
      >
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof SwList>;

type AppDisplayType = 'default' | 'with_divider' | 'display_grid' | 'with_loading';

interface AppProps {
  displayType?: AppDisplayType;
}

const App = ({ displayType = 'default' }: AppProps) => {
  // eslint-disable-next-line arrow-body-style
  const renderItem = useCallback(
    (account: DemoAccountType) => {
      return (
        <div key={account.name} className='__item-wrapper'>
          <AccountCard
            address={account.address}
            accountName={account.name}
            isShowSubIcon={false}
            prefix={0}
            size={40}
            theme="polkadot"
          />

          {displayType === 'with_divider' && <Divider />}
        </div>
      );
    },
    [displayType],
  );

  const searchFunc = (item: DemoAccountType, searchText: string) => {
    const searchTextLowerCase = searchText.toLowerCase();

    return (
      item.name.toLowerCase().includes(searchTextLowerCase) ||
      item.address.toLowerCase().includes(searchTextLowerCase)
    );
  };

  const sectionProps: SwListSectionProps<DemoAccountType> = {
    renderItem,
    list: DemoAccounts,
    enableSearchInput: true,
    height: '100%',
    searchPlaceholder: 'Search or enter website',
    searchFunction: searchFunc,
    searchMinCharactersCount: 2,
  };

  if (displayType === 'default') {
    sectionProps.displayRow = true;
    sectionProps.rowGap = '16px';
  } else if (displayType === 'display_grid') {
    sectionProps.displayGrid = true;
    sectionProps.gridGap = '16px';
    sectionProps.minColumnWidth = '150px';
  } else if (displayType === 'with_loading') {
    sectionProps.displayRow = true;
    sectionProps.rowGap = '16px';
    sectionProps.renderOnScroll = false;
    sectionProps.hasMoreItems = true;
    sectionProps.limit = 4;
  }

  return <SwList.Section {...sectionProps} />;
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof App> = (args) => <App {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};

export const WithDivider = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithDivider.args = {
  displayType: 'with_divider',
};

export const DisplayGrid = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DisplayGrid.args = {
  displayType: 'display_grid',
};

export const WithLoading = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithLoading.args = {
  displayType: 'with_loading',
};
