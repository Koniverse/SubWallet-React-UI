import { resetComponent } from 'antd/es/style';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { mergeToken, genComponentStyleHook } from '../../theme/internal';

export interface ComponentToken {
  // Component token here
}

interface SwQrCodeToken extends FullToken<'SwQRCode'> {
  QRCodeExpiredTextColor: string;
  QRCodeMaskBackgroundColor: string;
}

const genSwQRCodeStyle: GenerateStyle<SwQrCodeToken> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: token.colorWhite,
      borderRadius: token.borderRadiusLG,
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      [`& > ${componentCls}-mask`]: {
        position: 'absolute',
        insetBlockStart: 0,
        insetInlineStart: 0,
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        color: token.colorText,
        lineHeight: token.lineHeight,
        background: token.QRCodeMaskBackgroundColor,
        textAlign: 'center',
        [`& > ${componentCls}-expired`]: {
          color: token.QRCodeExpiredTextColor,
        },
      },
      '&-icon': {
        marginBlockEnd: token.marginXS,
        fontSize: token.controlHeight,
      },
    },
    [`${componentCls}-borderless`]: {
      borderColor: 'transparent',
    },
  };
};

export default genComponentStyleHook<'SwQRCode'>('SwQRCode', (token) =>
  genSwQRCodeStyle(
    mergeToken<SwQrCodeToken>(token, {
      QRCodeExpiredTextColor: 'rgba(0, 0, 0, 0.88)',
      QRCodeMaskBackgroundColor: 'rgba(255, 255, 255, 0.96)',
    }),
  ),
);
