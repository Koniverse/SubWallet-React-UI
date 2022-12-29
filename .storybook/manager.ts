import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';

const theme = themes.dark;
theme.brandImage = './subwallet.png';

addons.setConfig({
  theme,
});
