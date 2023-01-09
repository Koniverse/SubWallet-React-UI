import { faCheck } from '@fortawesome/free-solid-svg-icons';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  Wallet,
  Aperture,
  Rocket,
  Database,
  Globe,
  QrCode,
  FunnelSimple,
  MagnifyingGlass,
  Gear,
} from 'phosphor-react';
import React, { useCallback, useMemo, useState } from 'react';
import Logo from '../../logo';
import SelectModal from '../../select-modal';
import SwAvatar from '../../sw-avatar';
import Icon from '../../icon';
import Typography from '../../typography';
import type { SwScreenLayoutProps } from '../index';
import type { ButtonProps } from '../../button';
import SwScreenLayout from '../index';

interface WrapperProps extends SwScreenLayoutProps {
  subHeaderRightIconType: number;
  headerRightIconType: number;
  selectBackground: 'default' | 'transparent';
}

interface Account {
  address: string;
  name: string;
  type: 'polkadot' | 'ethereum';
}

const ALL_ACCOUNT_KEY = 'ALL';

const PREDEFINED_ACCOUNTS: Account[] = [
  {
    name: 'All account',
    address: ALL_ACCOUNT_KEY,
    type: 'polkadot',
  },
  {
    name: 'S2kael',
    address: '5DnokDpMdNEH8cApsZoWQnjsggADXQmGWUb6q8ZhHeEwvncL',
    type: 'polkadot',
  },
  {
    name: 'S2kael - EVM',
    address: '0x49E46fc304a448A2132d2DBEd6df47D0084cE92f',
    type: 'ethereum',
  },
  {
    name: 'Moon - EVM',
    address: '0x6B2C71bD819FDEe4D58BA110544Ee91B052CE157',
    type: 'ethereum',
  },
];

const SELECT_MODAL_ID = 'select-account';

const Icons = {
  icon: <Icon type="phosphor" phosphorIcon={QrCode} size="sm" />,
  icon1: <Icon type="phosphor" phosphorIcon={FunnelSimple} size="sm" />,
  icon2: <Icon type="phosphor" phosphorIcon={MagnifyingGlass} size="sm" />,
  icon3: <Icon type="phosphor" phosphorIcon={Gear} size="sm" />,
};
const Wrapper: React.FC<WrapperProps> = ({
  subHeaderRightIconType,
  headerRightIconType,
  selectBackground,
  ...args
}) => {
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
        return [Icons.icon1, Icons.icon2, Icons.icon3].map((icon) => ({
          icon,
        }));
      case 1:
        return [
          {
            icon: Icons.icon,
          },
        ];
      default:
        return [];
    }
  }, [subHeaderRightIconType]);

  const headerIcons = useMemo((): ButtonProps[] => {
    switch (headerRightIconType) {
      case 2:
        return [Icons.icon1, Icons.icon2, Icons.icon3].map((icon) => ({
          icon,
        }));
      case 1:
        return [
          {
            icon: Icons.icon,
          },
        ];
      default:
        return [];
    }
  }, [headerRightIconType]);

  const [selectedAccount, setSelectedAccount] = useState<string>(ALL_ACCOUNT_KEY);

  const renderItem = useCallback(
    (item: Account, _selected: boolean): React.ReactNode => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 16,
          justifyContent: 'space-between',
          padding: '12px 16px',
          borderRadius: 8,
          backgroundColor: '#252525',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          {item.address === ALL_ACCOUNT_KEY ? (
            <Logo
              size="40px"
              isShowSubLogo={false}
              subLogoSize="0"
              shape="circle"
              subLogoShape="circle"
            />
          ) : (
            <SwAvatar
              theme={item.type}
              size={40}
              value={item.address}
              prefix={42}
              isShowSubIcon={false}
              subIconType='phosphor'
            />
          )}
          <div>
            <Typography.Text>{item.name}</Typography.Text>
            {item.address === ALL_ACCOUNT_KEY ? undefined : (
              <Typography.Text>
                (...{item.address.substring(item.address.length - 2)})
              </Typography.Text>
            )}
          </div>
        </div>
        <div>
          {_selected && (
            <Icon type="fontAwesome" fontawesomeIcon={faCheck} iconColor="#7CD383" size="xs" />
          )}
        </div>
      </div>
    ),
    [],
  );

  const renderSelected = useCallback(
    (item: Account): React.ReactNode => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          {item.address === ALL_ACCOUNT_KEY ? (
            <Logo
              size="20px"
              isShowSubLogo={false}
              subLogoSize="0"
              shape="circle"
              subLogoShape="circle"
            />
          ) : (
            <SwAvatar
              theme={item.type}
              size={20}
              value={item.address}
              prefix={42}
              isShowSubIcon={false}
              subIconType='phosphor'
            />
          )}
          {item.address === ALL_ACCOUNT_KEY ? (
            <div>
              <Typography.Text>{item.name}</Typography.Text>
            </div>
          ) : (
            <div>
              <Typography.Text>{item.name}</Typography.Text>
              {item.address === ALL_ACCOUNT_KEY ? undefined : (
                <Typography.Text>
                  (...{item.address.substring(item.address.length - 2)})
                </Typography.Text>
              )}
            </div>
          )}
        </div>
      </div>
    ),
    [],
  );

  return (
    <div style={{ margin: -16, width: 400, height: 600 }}>
      <SwScreenLayout
        {...args}
        tabBarItems={[
          {
            icon: {
              type: 'phosphor',
              phosphorIcon: Wallet,
            },
            label: 'Tokens',
            key: 'token',
            onClick: onSelectTab('token'),
          },
          {
            icon: {
              type: 'phosphor',
              phosphorIcon: Aperture,
            },
            label: 'NFTs',
            key: 'nft',
            onClick: onSelectTab('nft'),
          },
          {
            icon: {
              type: 'phosphor',
              phosphorIcon: Rocket,
            },
            label: 'Crowdloands',
            key: 'crowdloands',
            onClick: onSelectTab('crowdloands'),
          },
          {
            icon: {
              type: 'phosphor',
              phosphorIcon: Database,
            },
            label: 'Staking',
            key: 'staking',
            onClick: onSelectTab('staking'),
          },
          {
            icon: {
              type: 'phosphor',
              phosphorIcon: Globe,
            },
            label: 'Browser',
            key: 'browser',
            onClick: onSelectTab('browser'),
          },
        ]}
        selectedTabBarItem={selectedTab}
        subHeaderIcons={subHeaderIcons}
        headerIcons={headerIcons}
        headerContent={
          // @ts-ignore
          <SelectModal
            inputWidth={220}
            items={PREDEFINED_ACCOUNTS}
            itemKey="address"
            selected={selectedAccount}
            renderItem={renderItem}
            onSelect={setSelectedAccount}
            id={SELECT_MODAL_ID}
            renderSelected={renderSelected}
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
  title: 'Core/SwScreenLayout',
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
};
