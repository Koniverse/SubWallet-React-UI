import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';
const logo = require('./subwallet.png');

const theme = themes.dark;
theme.brandImage = logo;

addons.setConfig({
  theme,
});
