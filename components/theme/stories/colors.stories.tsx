import React from 'react';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import cls from 'classnames';
// eslint-disable-next-line import/no-extraneous-dependencies
import { css, Global } from '@emotion/react';
import { useToken } from '../internal';
import Palette from '../../../.dumi/theme/common/Color/Palette';

const colors = [
  {
    name: 'colorPrimary',
    count: 10,
    english: 'colorPrimary',
  },
  {
    name: 'colorSecondary',
    count: 10,
    english: 'colorSecondary',
  },
  {
    name: 'colorSuccess',
    count: 10,
    english: 'colorSuccess',
  },
  {
    name: 'colorWarning',
    count: 10,
    english: 'colorWarning',
  },
  {
    name: 'colorError',
    count: 10,
    english: 'colorError',
  },
  {
    name: 'colorInfo',
    count: 10,
    english: 'colorInfo',
  },
  {
    name: 'red',
    count: 10,
    english: 'Dust Red',
  },
  {
    name: 'volcano',
    count: 10,
    english: 'Volcano',
  },
  {
    name: 'orange',
    count: 10,
    english: 'Sunset Orange',
  },
  {
    name: 'gold',
    count: 10,
    english: 'Calendula Gold',
  },
  {
    name: 'yellow',
    count: 10,
    english: 'Sunrise Yellow',
  },
  {
    name: 'lime',
    count: 10,
    english: 'Lime',
  },
  {
    name: 'green',
    count: 10,
    english: 'Polar Green',
  },
  {
    name: 'cyan',
    count: 10,
    english: 'Cyan',
  },
  {
    name: 'blue',
    count: 10,
    english: 'Daybreak Blue',
  },
  {
    name: 'geekblue',
    count: 10,
    english: 'Geek Blue',
  },
  {
    name: 'purple',
    count: 10,
    english: 'Golden Purple',
  },
  {
    name: 'magenta',
    count: 10,
    english: 'Magenta',
  },
];

const ColorPalettes: React.FC<{ dark?: boolean }> = (props) => {
  const { dark } = props;
  const colorCls = cls('color-palettes', {
    'color-palettes-dark': !!dark,
  });
  return (
    <div className={colorCls}>
      {colors.map((color) => (
        <Palette key={color.name} color={color} dark showTitle={false} direction="horizontal" />
      ))}
    </div>
  );
};

const ColorStyle = () => {
  const [, token] = useToken();

  const makePalette = (color: string, index: number = 1): string => {
    if (index <= 10) {
      return `
.palette-${color}-${index} {
  background: ${(token as any)[`${color}-${index}`]};
}
${makePalette(color, index + 1)}
    `;
    }
    return '';
  };

  return (
    <Global
      styles={css`
        .color-palettes {
          margin: 0 1%;

          &-dark {
            margin: 0;

            .color-title {
              color: rgba(255, 255, 255, 0.85);
            }

            .color-description {
              color: rgba(255, 255, 255, 0.45);
            }

            .color-palette {
              margin: 45px 3.5% 45px 0;

              &:nth-of-type(3n) {
                margin-right: 0;
              }

              .main-color-item {
                margin-right: 0;

                &:hover {
                  margin-right: -8px;
                }
              }
            }
          }
        }

        .color-palette {
          display: inline-block;
          width: 31%;
          margin: 45px 1%;

          &-pick {
            margin: 0 0 20px;
            font-size: 20px;
            text-align: center;
          }

          &-picker {
            margin: 24px 0;

            &-value {
              position: relative;
              top: -3px;
              margin-left: 16px;
              font-size: 14px;
              font-family: Consolas, sans-serif;

              .ant-row-rtl & {
                margin-right: 16px;
                margin-left: 0;
              }
            }

            &-validation {
              position: relative;
              top: -3px;
              margin-left: 16px;
              color: ${token.colorError};
              font-size: 13px;

              .ant-row-rtl & {
                margin-right: 16px;
                margin-left: 0;
              }

              &-dark {
                margin-left: 0;
              }
            }
          }
        }

        .main-color {
          ${makePalette('colorPrimary')}
          ${makePalette('colorSecondary')}
          ${makePalette('colorPrimary')}
          ${makePalette('colorSecondary')}
          ${makePalette('colorSuccess')}
          ${makePalette('colorWarning')}
          ${makePalette('colorError')}
          ${makePalette('colorInfo')}
          ${makePalette('blue')}
          ${makePalette('purple')}
          ${makePalette('cyan')}
          ${makePalette('green')}
          ${makePalette('magenta')}
          ${makePalette('red')}
          ${makePalette('volcano')}
          ${makePalette('orange')}
          ${makePalette('gold')}
          ${makePalette('yellow')}
          ${makePalette('lime')}
          ${makePalette('geekblue')}

          text-align: left;

          &-item {
            position: relative;
            height: 44px;
            margin-right: 4px;
            padding: 0 12px;
            font-size: 14px;
            font-family: Consolas, sans-serif;
            line-height: 44px;
            cursor: pointer;
            transition: all 0.2s;

            &:first-child {
              border-radius: 4px 4px 0 0;
            }

            &:last-child {
              border-radius: 0 0 4px 4px;
            }

            &:hover {
              margin-right: -8px;
              border-radius: 0 4px 4px 0;
            }
          }

          &-item &-text {
            float: left;
            transition: all 0.3s;
          }

          &-item &-value {
            position: relative;
            left: 3px;
            float: right;
            transform: scale(0.85);
            transform-origin: 100% 50%;
            opacity: 0;
            transition: all 0.3s;
          }
        }

        .color-title {
          margin: 0 0 24px;
          color: #5c6b77;
          font-weight: 500;
          font-size: 22px;
          text-align: center;
          text-transform: capitalize;
        }

        .color-description {
          display: block;
          color: #777;
          font-weight: lighter;
          font-size: 14px;
        }

        .main-color:hover {
          .main-color-value {
            left: 0;
            opacity: 0.7;
          }
        }

        .color-palette-horizontal {
          box-sizing: border-box;
          width: 100%;

          &-dark {
            height: 303px;
            padding: 32px 28px;
            background-color: #141414;

            .color-palette-picker {
              margin-bottom: 0;
            }

            .color-palette-pick {
              color: rgba(255, 255, 255, 0.65);
              text-align: left;

              &-hex {
                color: rgba(255, 255, 255, 0.65);
              }

              .ant-row-rtl & {
                direction: rtl;
                text-align: right;
              }
            }
          }

          .main-color {
            display: flex;

            &-item {
              position: relative;
              flex: 1;
              box-sizing: border-box;
              height: 86px;
              margin-right: 0;
              padding: 37px 0 0;
              line-height: normal;
              text-align: center;
              border-radius: 0;

              .main-color-text {
                float: none;
              }

              &:hover {
                height: 96px;
                margin-top: -10px;
                border-radius: 4px 4px 0 0;
              }
            }

            &-value {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              text-align: center;
              transform-origin: unset;
            }

            &:hover {
              .main-color-item {
                padding-top: 8px;
              }

              .main-color-value {
                bottom: 8px;
                opacity: 0.7;
              }
            }
          }
        }
      `}
    />
  );
};

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Core/Colors',
  component: ColorPalettes,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   dark: { control: 'boolean', defaultValue: true },
  // },
  parameters: {
    viewport: {
      defaultViewport: 'none',
    },
  },
} as ComponentMeta<typeof ColorPalettes>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ColorPalettes> = (args) => (
  <div>
    <ColorStyle />
    <ColorPalettes {...args} />
  </div>
);

export const ColorMap = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ColorMap.args = {
  dark: true,
};
