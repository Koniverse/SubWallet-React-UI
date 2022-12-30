import 'antd/dist/reset.css';
import { Story } from '@storybook/react';
import React from 'react';
import { ConfigProvider, theme } from '../components';
import seedToken from '../components/theme/themes/seed';
import { SWPreviewTheme } from './theme';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    theme: SWPreviewTheme,
  },
  backgrounds: {
    default: 'Figma',
    values: [
      {
        name: 'Figma',
        value: '#000000',
      },
      {
        name: 'Extension',
        value: SWPreviewTheme.appContentBg,
      },
    ],
  },
  viewport: {
    viewports: {
      extension: { name: 'Extension', styles: { width: '400px', height: '600px', type: 'other' } },
      mobile: { name: 'Mobile', styles: { width: '400px', height: '856px', type: 'mobile' } },
      ...INITIAL_VIEWPORTS,
    },
    defaultViewport: 'extension',
  },
};

export const decorators = [
  (Component: Story) => (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          ...seedToken,
          ['gray']: '#D9D9D9',
          ['gray-1']: '#1B1B1B',
          ['gray-2']: '#363636',
          ['gray-3']: '#4D4D4D',
          ['gray-4']: '#737373',
          ['gray-5']: '#A6A6A6',
          ['gray-6']: '#D9D9D9',
          ['gray-7']: '#E6E6E6',
          ['gray-8']: '#F2F2F2',
          ['gray-9']: '#F7F7F7',
          ['gray-10']: '#FAFAFA',
        },
      }}
    >
      <div>
        <Component />
      </div>
    </ConfigProvider>
  ),
];
