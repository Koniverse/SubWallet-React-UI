import type { FontMapToken } from '../../interface';
import genFontSizes from './genFontSizes';

const genFontMapToken = (fontSize: number): FontMapToken => {
  const fontSizePairs = genFontSizes(fontSize);
  const fontSizes = fontSizePairs.map((pair) => pair.size);
  const lineHeights = fontSizePairs.map((pair) => pair.lineHeight);

  return {
    fontSizeXS: 10,
    fontSizeSM: fontSizes[0],
    fontSize: fontSizes[1],
    fontSizeLG: fontSizes[2],
    fontSizeXL: fontSizes[3],

    fontSizeHeading1: fontSizes[6],
    fontSizeHeading2: fontSizes[5],
    fontSizeHeading3: fontSizes[4],
    fontSizeHeading4: fontSizes[3],
    fontSizeHeading5: fontSizes[2],
    fontSizeHeading6: fontSizes[1],

    fontSizeSuper1: 68,
    fontSizeSuper2: 56,
    fontSizeSuper3: 46,

    lineHeight: lineHeights[1],
    lineHeightLG: lineHeights[2],
    lineHeightSM: lineHeights[0],
    lineHeightXS: 18,

    lineHeightHeading1: lineHeights[6],
    lineHeightHeading2: lineHeights[5],
    lineHeightHeading3: lineHeights[4],
    lineHeightHeading4: lineHeights[3],
    lineHeightHeading5: lineHeights[2],
    lineHeightHeading6: lineHeights[1],

    lineHeightSuper1: 76,
    lineHeightSuper2: 64,
    lineHeightSuper3: 54,
  };
};

export default genFontMapToken;
