import type { FontMapToken } from '../../interface';
import genFontSizes from './genFontSizes';

const genFontMapToken = (fontSize: number): FontMapToken => {
  const fontSizePairs = genFontSizes(fontSize);
  const fontSizes = fontSizePairs.map((pair) => pair.size);
  const lineHeights = fontSizePairs.map((pair) => pair.lineHeight);

  return {
    fontSizeXS: fontSizes[0],
    fontSizeSM: fontSizes[1],
    fontSize: fontSizes[2],
    fontSizeLG: fontSizes[3],
    fontSizeXL: fontSizes[4],

    fontSizeHeading1: fontSizes[7],
    fontSizeHeading2: fontSizes[6],
    fontSizeHeading3: fontSizes[5],
    fontSizeHeading4: fontSizes[4],
    fontSizeHeading5: fontSizes[3],
    fontSizeHeading6: fontSizes[2],

    fontSizeSuper1: fontSizes[10],
    fontSizeSuper2: fontSizes[9],
    fontSizeSuper3: fontSizes[8],

    lineHeight: lineHeights[2],
    lineHeightLG: lineHeights[3],
    lineHeightSM: lineHeights[1],
    lineHeightXS: lineHeights[0],

    lineHeightHeading1: lineHeights[7],
    lineHeightHeading2: lineHeights[6],
    lineHeightHeading3: lineHeights[5],
    lineHeightHeading4: lineHeights[4],
    lineHeightHeading5: lineHeights[3],
    lineHeightHeading6: lineHeights[2],

    lineHeightSuper1: lineHeights[10],
    lineHeightSuper2: lineHeights[9],
    lineHeightSuper3: lineHeights[8],
  };
};

export default genFontMapToken;
