/* eslint-disable import/prefer-default-export */
import type { CSSObject } from '@ant-design/cssinjs';
import type { DerivativeToken } from '../theme/internal';

export { operationUnit } from './operationUnit';
export { roundedArrow } from './roundedArrow';

export const textEllipsis: CSSObject = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
};

export const resetComponent = (token: DerivativeToken): CSSObject => ({
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  color: token.colorText,
  fontSize: token.fontSize,
  // font-variant: @font-variant-base;
  fontWeight: token.bodyFontWeight,
  lineHeight: token.lineHeight,
  listStyle: 'none',
  // font-feature-settings: @font-feature-settings-base;
  fontFamily: token.fontFamily,
});

export const resetIcon = (): CSSObject => ({
  display: 'inline-flex',
  alignItems: 'center',
  color: 'inherit',
  fontStyle: 'normal',
  lineHeight: 0,
  textAlign: 'center',
  textTransform: 'none',
  // for SVG icon, see https://blog.prototypr.io/align-svg-icons-to-text-and-say-goodbye-to-font-icons-d44b3d7b26b4
  verticalAlign: '-0.125em',
  textRendering: 'optimizeLegibility',
  '-webkit-font-smoothing': 'antialiased',
  '-moz-osx-font-smoothing': 'grayscale',

  '> *': {
    lineHeight: 1,
  },

  svg: {
    display: 'inline-block',
  },

  '& &-icon': {
    display: 'block',
  },
});

export const clearFix = (): CSSObject => ({
  // https://github.com/ant-design/ant-design/issues/21301#issuecomment-583955229
  '&::before': {
    display: 'table',
    content: '""',
  },

  '&::after': {
    // https://github.com/ant-design/ant-design/issues/21864
    display: 'table',
    clear: 'both',
    content: '""',
  },
});

export const genLinkStyle = (token: DerivativeToken): CSSObject => ({
  a: {
    color: token.colorLink,
    textDecoration: token.linkDecoration,
    backgroundColor: 'transparent', // remove the gray background on active links in IE 10.
    outline: 'none',
    cursor: 'pointer',
    transition: `color ${token.motionDurationSlow}`,
    '-webkit-text-decoration-skip': 'objects', // remove gaps in links underline in iOS 8+ and Safari 8+.

    '&:hover': {
      color: token.colorLinkHover,
    },

    '&:active': {
      color: token.colorLinkActive,
    },

    [`&:active,
  &:hover`]: {
      textDecoration: token.linkHoverDecoration,
      outline: 0,
    },

    // https://github.com/ant-design/ant-design/issues/22503
    '&:focus': {
      textDecoration: token.linkFocusDecoration,
      outline: 0,
    },

    '&[disabled]': {
      color: token.colorTextDisabled,
      cursor: 'not-allowed',
    },
  },
});

export const genCommonStyle = (token: DerivativeToken, componentPrefixCls: string): CSSObject => {
  const { fontFamily, fontSize } = token;

  const rootPrefixSelector = `[class^="${componentPrefixCls}"], [class*=" ${componentPrefixCls}"]`;

  return {
    [rootPrefixSelector]: {
      fontFamily,
      fontSize,
      boxSizing: 'border-box',
      fontWeight: token.bodyFontWeight,

      '&::before, &::after': {
        boxSizing: 'border-box',
      },

      [rootPrefixSelector]: {
        boxSizing: 'border-box',

        '&::before, &::after': {
          boxSizing: 'border-box',
        },
      },
    },
  };
};

export const genFocusOutline = (token: DerivativeToken): CSSObject => ({
  outline: `${token.lineWidth * 4}px solid ${token.colorPrimaryBorder}`,
  outlineOffset: 1,
  transition: 'outline-offset 0s, outline 0s',
});

export const genFocusStyle = (token: DerivativeToken): CSSObject => ({
  '&:focus-visible': {
    ...genFocusOutline(token),
  },
});

export const squircleSvgInput = {
  WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44px' height='44px' viewBox='0 0 64 64'%3E%3Cdefs%3E%3CclipPath id='se-64-64-8.192-32'%3E%3Cpath fill='%23000' d='M 0,32%0AC 0,8.192 8.192,0 32,0%0AL 32,0%0AC 55.808,0 64,8.192 64,32%0AL 64,32%0AC 64,55.808 55.808,64 32,64%0AL 32,64%0AC 8.192,64 0,55.808 0,32%0AL 0,32'/%3E%3C/clipPath%3E%3C/defs%3E%3Cg clip-path='url(%23se-64-64-8.192-32)'%3E%3Crect width='64' height='64' fill='%23000'/%3E%3C/g%3E%3C/svg%3E")`,
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center center',
};

export const squircleSvgWrapper = {
  WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48px' height='48px' viewBox='0 0 64 64'%3E%3Cdefs%3E%3CclipPath id='se-64-64-8.192-32'%3E%3Cpath fill='%23000' d='M 0,32%0AC 0,8.192 8.192,0 32,0%0AL 32,0%0AC 55.808,0 64,8.192 64,32%0AL 64,32%0AC 64,55.808 55.808,64 32,64%0AL 32,64%0AC 8.192,64 0,55.808 0,32%0AL 0,32'/%3E%3C/clipPath%3E%3C/defs%3E%3Cg clip-path='url(%23se-64-64-8.192-32)'%3E%3Crect width='64' height='64' fill='%23000'/%3E%3C/g%3E%3C/svg%3E")`,
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center center',
};

export function getScrollbarWidth() {
  // Creating invisible container
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll'; // forcing scrollbar to appear
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement('div');
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  // Removing temporary elements from the DOM
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  outer.parentNode && outer.parentNode.removeChild(outer);

  return scrollbarWidth;
}
