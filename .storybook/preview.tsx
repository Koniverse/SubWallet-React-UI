import '../components/style/reset.css';
import { Story } from '@storybook/react';
import React from 'react';
import { ConfigProvider, theme } from '../components';
import seedToken from '../components/theme/themes/seed';
import { SWPreviewTheme } from './theme';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import logoMap from '../components/theme/themes/logoMap';

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
  options: {
    storySort: {
      order: [
        'Core',
        ['Colors', 'Typography', ['Text', 'Heading', 'Link', 'Address'], 'Number', 'Squircle'],
        'ActivityIndicator',
        'Basic Components',
        ['Icon', 'Button', 'Divider', 'Tag', 'Image', 'QRCode', 'Logo', 'SwAvatar'],
        'Modal',
        'Form',
        ['Input', 'Password', 'Textarea', 'Switch', 'SingleFileDrager', 'Form Demo'],
      ],
    },
  },
};

export const decorators = [
  (Component: Story) => (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          ...seedToken,
        },
        logoMap: logoMap,
      }}
    >
      <div>
        <Component />
      </div>
    </ConfigProvider>
  ),
];
