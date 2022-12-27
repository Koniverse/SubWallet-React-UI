import 'antd/dist/reset.css';
import { Story } from '@storybook/react';
import React from 'react';
import { ConfigProvider } from '../components';
import seedToken from '../components/theme/themes/seed';
import { themes } from '@storybook/theming';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    theme: themes.dark,
  },
};

export const decorators = [
  (Component: Story) => (
    <ConfigProvider
      theme={{
        token: {
          ...seedToken,
          fontFamily: `'Plus Jakarta Sans'`,
        },
      }}
    >
      <div>
        <Component />
      </div>
    </ConfigProvider>
  ),
];
