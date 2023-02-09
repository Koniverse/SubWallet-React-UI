import type { ComponentStory, ComponentMeta } from '@storybook/react';
import React, { useCallback, useMemo, useState } from 'react';
import { useToken } from '../../theme/internal';
import SelectModal from '../../select-modal';
import Typography from '../../typography';
import type { SwScreenLayoutProps } from '../index';
import type { ButtonProps } from '../../button';
import SwScreenLayout from '../index';
import { TabBarItems } from '../../sw-tab-bar/stories/tab-bar-items';
import { renderRightIcons } from './header-icons';
import {
  ALL_ACCOUNT_KEY,
  PREDEFINED_ACCOUNTS,
  renderHeaderContentItem,
  renderHeaderContentSelected,
} from './header-content';

interface WrapperProps extends SwScreenLayoutProps {
  subHeaderRightIconType: number;
  headerRightIconType: number;
  selectBackground: 'default' | 'transparent';
  withFooter: boolean;
  withButton: boolean;
}

const SELECT_MODAL_ID = 'select-account';

const Wrapper: React.FC<WrapperProps> = ({
  subHeaderRightIconType,
  headerRightIconType,
  selectBackground,
  withFooter,
  withButton,
  ...args
}) => {
  const [, token] = useToken();
  const [selectedTab, setSelectedTab] = useState('token');
  const onSelectTab = useCallback(
    (key: string) => () => {
      setSelectedTab(key);
    },
    [],
  );

  const subHeaderIcons = useMemo(
    (): ButtonProps[] => renderRightIcons(subHeaderRightIconType),
    [subHeaderRightIconType],
  );

  const headerIcons = useMemo(
    (): ButtonProps[] => renderRightIcons(headerRightIconType),
    [headerRightIconType],
  );

  const [selectedAccount, setSelectedAccount] = useState<string>(ALL_ACCOUNT_KEY);

  const footer = useMemo(
    (): React.ReactNode => (
      <div
        style={{
          color: token.colorTextDescription,
          textAlign: 'center',
          fontSize: token.fontSizeHeading6,
          lineHeight: token.lineHeightHeading6,
          padding: '14px 0',
        }}
      >
        <div>By continuing, you agree to our</div>
        <div>
          <span style={{ color: token.colorText }}>Terms & Conditions</span>&nbsp;and&nbsp;
          <span style={{ color: token.colorText }}>Privacy Policy</span>
        </div>
      </div>
    ),
    [token],
  );

  return (
    <div style={{ margin: -16, width: 400, height: 600 }}>
      <SwScreenLayout
        {...args}
        tabBarItems={TabBarItems.map((item) => ({
          ...item,
          onClick: onSelectTab(item.key),
        }))}
        selectedTabBarItem={selectedTab}
        subHeaderIcons={subHeaderIcons}
        headerIcons={headerIcons}
        footerButton={withButton ? {} : undefined}
        footer={withFooter ? footer : undefined}
        headerContent={
          // @ts-ignore
          <SelectModal
            inputWidth={220}
            items={PREDEFINED_ACCOUNTS}
            itemKey="address"
            selected={selectedAccount}
            renderItem={renderHeaderContentItem}
            onSelect={setSelectedAccount}
            id={SELECT_MODAL_ID}
            renderSelected={renderHeaderContentSelected}
            shape='round'
            title="Select Account"
            background={selectBackground}
          />
        }
      >
        <div>
          {new Array(10).fill(null).map((_value, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Typography.Paragraph key={index}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet corporis
              cumque deleniti dicta distinctio dolores ea est et eveniet ipsam iste molestiae non
              possimus, recusandae rem sint. Cumque, eum?
            </Typography.Paragraph>
          ))}
        </div>
      </SwScreenLayout>
    </div>
  );
};
export default {
  title: 'Layout/SwScreenLayout',
  component: Wrapper,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // Header
    headerCenter: {
      control: false,
    },
    showHeader: {
      control: false,
    },
    headerBackground: {
      control: false,
    },
    showLeftButton: {
      control: false,
    },
    headerPaddingVertical: {
      control: false,
    },
    headerRightIconType: {
      control: false,
    },

    // Sub header
    showSubHeader: {
      control: false,
    },
    title: {
      type: 'string',
    },
    subHeaderBackground: {
      control: false,
    },
    subHeaderCenter: {
      control: false,
    },
    showBackButton: {
      control: false,
    },
    subHeaderPaddingVertical: {
      control: false,
    },
    subHeaderRightIconType: {
      control: false,
    },

    // Footer
    withDivider: {
      control: false,
    },
    withButton: {
      control: false,
    },
    withFooter: {
      control: false,
    },

    // Tab bar
    showTabBar: {
      control: false,
    },
  },
} as ComponentMeta<typeof Wrapper>;

const Template: ComponentStory<typeof Wrapper> = (args) => <Wrapper {...args} />;

const DEFAULT_ARGS = {
  showHeader: true,
  headerBackground: 'default',
  headerCenter: true,
  showLeftButton: true,
  headerPaddingVertical: true,
  headerRightIconType: 1,

  title: 'Screen title',
  subHeaderBackground: 'default',
  subHeaderPaddingVertical: true,
  subHeaderCenter: false,
  showSubHeader: false,
  showBackButton: false,
  subHeaderRightIconType: 1,

  withDivider: false,
  showTabBar: false,
  withButton: false,
  withFooter: false,
};
export const HeaderWithTabBar = Template.bind({});

HeaderWithTabBar.args = {
  ...DEFAULT_ARGS,
  showTabBar: true,
};

export const TwoHeaderWithTabBar = Template.bind({});

TwoHeaderWithTabBar.args = {
  ...DEFAULT_ARGS,
  showSubHeader: true,
  subHeaderBackground: 'transparent',
  subHeaderPaddingVertical: false,
  showTabBar: true,
};

export const TwoHeaderWithTabBarAndButton = Template.bind({});

TwoHeaderWithTabBarAndButton.args = {
  ...DEFAULT_ARGS,
  showSubHeader: true,
  subHeaderBackground: 'transparent',
  subHeaderPaddingVertical: false,
  withButton: true,
  showTabBar: true,
};

export const SubHeaderWithButton = Template.bind({});

SubHeaderWithButton.args = {
  ...DEFAULT_ARGS,
  showHeader: false,
  showSubHeader: true,
  subHeaderBackground: 'transparent',
  showBackButton: true,
  subHeaderRightIconType: 0,
  subHeaderCenter: true,
  withDivider: true,
  withButton: true,
};

export const SubHeaderWithFooter = Template.bind({});

SubHeaderWithFooter.args = {
  ...DEFAULT_ARGS,
  showHeader: false,
  showSubHeader: true,
  subHeaderBackground: 'transparent',
  withDivider: true,
  withFooter: true,
};

export const SubHeaderWithFooterAndButton = Template.bind({});

SubHeaderWithFooterAndButton.args = {
  ...DEFAULT_ARGS,
  showHeader: false,
  showSubHeader: true,
  subHeaderBackground: 'transparent',
  withDivider: true,
  withFooter: true,
  withButton: true,
};

export const SubHeaderOnly = Template.bind({});

SubHeaderOnly.args = {
  ...DEFAULT_ARGS,
  showHeader: false,
  showSubHeader: true,
  subHeaderBackground: 'transparent',
  subHeaderPaddingVertical: false,
  withDivider: true,
};
export const TwoHeaderOnly = Template.bind({});

TwoHeaderOnly.args = {
  ...DEFAULT_ARGS,
  showSubHeader: true,
  subHeaderCenter: true,
  showBackButton: true,
  subHeaderBackground: 'transparent',
  subHeaderPaddingVertical: false,
  subHeaderRightIconType: 0,
};
