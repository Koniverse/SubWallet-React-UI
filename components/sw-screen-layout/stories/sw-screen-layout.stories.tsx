import type { ComponentStory, ComponentMeta } from '@storybook/react';
import React, { useCallback, useMemo, useState } from 'react';
import { useToken } from '../../theme/internal';
import SelectModal from '../../select-modal';
import Typography from '../../typography';
import type { SwScreenLayoutProps } from '../index';
import type { ButtonProps } from '../../button';
import SwScreenLayout from '../index';
import { TabBarItems } from '../../sw-tab-bar/stories/tab-bar-items';
import { HeaderIcons } from './header-icons';
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

  const subHeaderIcons = useMemo((): ButtonProps[] => {
    switch (subHeaderRightIconType) {
      case 2:
        return [HeaderIcons.icon1, HeaderIcons.icon2, HeaderIcons.icon3].map((icon) => ({
          icon,
        }));
      case 1:
        return [
          {
            icon: HeaderIcons.icon,
          },
        ];
      default:
        return [];
    }
  }, [subHeaderRightIconType]);

  const headerIcons = useMemo((): ButtonProps[] => {
    switch (headerRightIconType) {
      case 2:
        return [HeaderIcons.icon1, HeaderIcons.icon2, HeaderIcons.icon3].map((icon) => ({
          icon,
        }));
      case 1:
        return [
          {
            icon: HeaderIcons.icon,
          },
        ];
      default:
        return [];
    }
  }, [headerRightIconType]);

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
    showHeader: {
      type: 'boolean',
    },
    headerBackground: {
      control: 'radio',
      options: ['default', 'transparent'],
    },
    headerCenter: {
      type: 'boolean',
    },
    showLeftButton: {
      type: 'boolean',
    },
    headerPaddingVertical: {
      type: 'boolean',
    },
    headerRightIconType: {
      type: 'number',
      control: {
        type: 'number',
        min: 0,
        max: 2,
      },
    },
    selectBackground: {
      control: 'radio',
      options: ['default', 'transparent'],
    },

    // Sub header
    showSubHeader: {
      type: 'boolean',
    },
    title: {
      type: 'string',
    },
    subHeaderBackground: {
      control: 'radio',
      options: ['default', 'transparent'],
    },
    subHeaderCenter: {
      type: 'boolean',
    },
    showBackButton: {
      type: 'boolean',
    },
    subHeaderPaddingVertical: {
      type: 'boolean',
    },
    subHeaderRightIconType: {
      type: 'number',
      control: {
        type: 'number',
        min: 0,
        max: 2,
      },
    },
    // Tab bar
    showTabBar: {
      type: 'boolean',
    },
  },
} as ComponentMeta<typeof Wrapper>;

const Template: ComponentStory<typeof Wrapper> = (args) => <Wrapper {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  showHeader: true,
  headerBackground: 'default',
  headerPaddingVertical: false,
  headerCenter: true,
  showLeftButton: false,
  headerRightIconType: 1,

  title: 'Screen title',
  subHeaderBackground: 'default',
  subHeaderPaddingVertical: false,
  subHeaderCenter: true,
  showSubHeader: false,
  showBackButton: false,
  subHeaderRightIconType: 1,

  showTabBar: false,
  withButton: false,
  withFooter: false,
};
