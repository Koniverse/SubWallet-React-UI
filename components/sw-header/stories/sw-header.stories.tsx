import { faCheck } from '@fortawesome/free-solid-svg-icons';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { QrCode, Gear, FunnelSimple, MagnifyingGlass } from 'phosphor-react';
import React, { useCallback, useMemo, useState } from 'react';
import Logo from '../../logo';
import Typography from '../../typography';
import SwAvatar from '../../sw-avatar';
import SelectModal from '../../select-modal';
import type { ButtonProps } from '../../button';
import Icon from '../../icon';
import SwHeader from '../index';

const rightIcon = <Icon type="phosphor" phosphorIcon={QrCode} size="sm" />;
const rightIcon1 = <Icon type="phosphor" phosphorIcon={FunnelSimple} size="sm" />;
const rightIcon2 = <Icon type="phosphor" phosphorIcon={MagnifyingGlass} size="sm" />;
const rightIcon3 = <Icon type="phosphor" phosphorIcon={Gear} size="sm" />;

interface Account {
  address: string;
  name: string;
  type: 'polkadot' | 'ethereum';
}

interface WrapperProps extends React.ComponentProps<typeof SwHeader> {
  rightType: number;
  selectBackground: 'default' | 'transparent';
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

const Wrapper: React.FC<WrapperProps> = ({ rightType, selectBackground, ...args }) => {
  const [selected, setSelected] = useState<string>(ALL_ACCOUNT_KEY);

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
            <Logo size={40} isShowSubLogo={false} shape="circle" subLogoShape="circle" />
          ) : (
            <SwAvatar
              theme={item.type}
              size={40}
              value={item.address}
              identPrefix={42}
              isShowSubIcon={false}
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
            <Logo size={20} isShowSubLogo={false} shape="circle" subLogoShape="circle" />
          ) : (
            <SwAvatar
              theme={item.type}
              size={20}
              value={item.address}
              identPrefix={42}
              isShowSubIcon={false}
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

  const rightButtons = useMemo((): ButtonProps[] => {
    switch (rightType) {
      case 2:
        return [rightIcon1, rightIcon2, rightIcon3].map((icon) => ({
          icon,
        }));
      case 1:
        return [
          {
            icon: rightIcon,
          },
        ];
      default:
        return [];
    }
  }, [rightType]);

  return (
    <SwHeader {...args} rightButtons={rightButtons}>
      {/* @ts-ignore */}
      <SelectModal
        inputWidth={220}
        items={PREDEFINED_ACCOUNTS}
        itemKey="address"
        selected={selected}
        renderItem={renderItem}
        onSelect={setSelected}
        id={SELECT_MODAL_ID}
        renderSelected={renderSelected}
        shape='round'
        title="Select Account"
        background={selectBackground}
      />
    </SwHeader>
  );
};
export default {
  title: 'Layout/SwHeader',
  component: Wrapper,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    background: {
      control: 'radio',
      options: ['default', 'transparent'],
    },
    center: {
      type: 'boolean',
    },
    showLeftButton: {
      type: 'boolean',
    },
    selectBackground: {
      control: 'radio',
      options: ['default', 'transparent'],
    },
    paddingVertical: {
      type: 'boolean',
    },
    rightType: {
      type: 'number',
      control: {
        type: 'number',
        min: 0,
        max: 2,
        step: 1,
      },
    },
  },
} as ComponentMeta<typeof Wrapper>;

const Template: ComponentStory<typeof Wrapper> = (args) => (
  <div style={{ margin: -16 }}>
    <Wrapper {...args} />
  </div>
);

export const Primary = Template.bind({});

Primary.args = {
  background: 'default',
  center: true,
  showLeftButton: true,
  rightType: 1,
  selectBackground: 'transparent',
  paddingVertical: false,
};
