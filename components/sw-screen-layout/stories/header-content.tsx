import { CheckCircle } from 'phosphor-react';
import React from 'react';
import Icon from '../../icon';
import Logo from '../../logo';
import SwAvatar from '../../sw-avatar';
import Typography from '../../typography';

export interface Account {
  address: string;
  name: string;
  type: 'polkadot' | 'ethereum';
}

export const ALL_ACCOUNT_KEY = 'ALL';

export const PREDEFINED_ACCOUNTS: Account[] = [
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

export const renderHeaderContentItem = (item: Account, _selected: boolean): React.ReactNode => (
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
          <Typography.Text>(...{item.address.substring(item.address.length - 2)})</Typography.Text>
        )}
      </div>
    </div>
    <div>
      {_selected && (
        <Icon
          type="phosphor"
          phosphorIcon={CheckCircle}
          iconColor="#7CD383"
          size="xs"
          weight="fill"
        />
      )}
    </div>
  </div>
);

export const renderHeaderContentSelected = (item: Account): React.ReactNode => (
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
);
