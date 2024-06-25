import type { BigNumber } from 'bignumber.js';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { ConfigContext } from '../config-provider';
import useStyle from './style';
import type { NumberFormatter} from '../_util/number';
import { toBNString , balanceFormatter, formatNumber } from '../_util/number';

import Typography from '../typography';
import { useToken } from '../theme/internal';

export interface SwNumberProps {
  value: string | number | BigNumber;
  decimal: number;
  size?: number;
  weight?: number;
  subFloatNumber?: boolean;
  prefix?: string;
  suffix?: string;
  formatType?: 'default' | 'balance' | 'custom';
  customFormatter?: NumberFormatter;
  metadata?: Record<string, number>;
  className?: string;
  prefixCls?: string;

  intOpacity?: number;
  intColor?: string;
  decimalOpacity?: number;
  decimalColor?: string;
  unitOpacity?: number;
  unitColor?: string;

  hide?: boolean;
  showHideLength?: number;
}

interface LocaleNumberFormat {
  decimal: string;
  thousand: string;
}

const intToLocaleString = (str: string, separator: string) =>
  str.replace(/\B(?=(\d{3})+(?!\d))/g, separator);

const getNumberSeparators = () => {
  // default
  const res: LocaleNumberFormat = {
    decimal: '.',
    thousand: '',
  };

  // convert a number formatted according to locale
  const str = parseFloat('1234.56').toLocaleString();

  // if the resulting number does not contain previous number
  // (i.e. in some Arabic formats), return defaults
  if (!str.match('1')) return res;

  // get decimal and thousand separators
  res.decimal = str.replace(/.*4(.*)5.*/, '$1');
  res.thousand = str.replace(/.*1(.*)2.*/, '$1');

  // return results
  return res;
};

const { decimal: decimalSeparator, thousand: thousandSeparator } = getNumberSeparators();

const Number: React.FC<SwNumberProps> = (props) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const [, token] = useToken();

  const {
    metadata,
    formatType,
    decimal,
    size: integerFontSize = 16,
    prefix,
    customFormatter,
    suffix,
    subFloatNumber,
    value,
    className,
    prefixCls: customizePrefixCls,
    intColor = token.colorTextLight1,
    intOpacity = 1,
    decimalColor = token.colorTextLight1,
    decimalOpacity = 1,
    unitColor = token.colorTextLight1,
    unitOpacity = 1,
    weight = 500,
    hide,
    showHideLength = 6,
  } = props;

  const intStyle = useMemo(
    (): React.CSSProperties => ({
      color: intColor,
      opacity: intOpacity,
    }),
    [intColor, intOpacity],
  );

  const decimalStyle = useMemo(
    (): React.CSSProperties => ({
      color: decimalColor,
      opacity: decimalOpacity,
    }),
    [decimalColor, decimalOpacity],
  );

  const unitStyle = useMemo(
    (): React.CSSProperties => ({
      color: unitColor,
      opacity: unitOpacity,
    }),
    [unitColor, unitOpacity],
  );

  const prefixCls = getPrefixCls('number', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const classNameExtend = useMemo(
    (): string => classNames(hashId, className, prefixCls),
    [hashId, className, prefixCls],
  );
  const decimalFontSize = useMemo((): number => {
    if (subFloatNumber) {
      return (integerFontSize * 24) / 38;
    }

    return integerFontSize;
  }, [subFloatNumber, integerFontSize]);

  const formatted = useMemo((): string => {
    try {
      switch (formatType) {
        case 'custom':
          if (customFormatter) {
            return formatNumber(value, decimal, customFormatter, metadata);
          }
          return formatNumber(value, decimal, balanceFormatter, metadata);
        case 'balance':
        case 'default':
        default:
          return formatNumber(value, decimal, balanceFormatter, metadata);
      }
    } catch (e) {
      return value.toString();
    }
  }, [value, decimal, customFormatter, formatType, metadata]);

  const [_int, _dec, _abbreviation] = useMemo((): [string, string, string] => {
    const [int, decAndAbb] = formatted.split('.');
    const [dec, abbreviation] = decAndAbb ? decAndAbb.split(' ') : [''];

    return [intToLocaleString(int, thousandSeparator), dec, abbreviation];
  }, [formatted]);

  const hideContent = useMemo(() => new Array(showHideLength).fill('*').join(''), [showHideLength]);

  return wrapSSR(
    <div className={classNames(classNameExtend)} attrValue={toBNString(value, decimal)}>
      {hide && (
        <Typography.Text
          className={classNames(`${prefixCls}-hide-content`)}
          style={{ ...intStyle, fontWeight: weight, fontSize: integerFontSize }}
        >
          {hideContent}
        </Typography.Text>
      )}
      {!hide && (
        <>
          {prefix && (
            <Typography.Text
              className={classNames(`${prefixCls}-prefix`)}
              style={{ ...unitStyle, fontWeight: weight, fontSize: integerFontSize }}
            >
              {prefix}
            </Typography.Text>
          )}
          <Typography.Text
            className={classNames(`${prefixCls}-integer`)}
            style={{ ...intStyle, fontWeight: weight, fontSize: integerFontSize }}
          >
            {_int}
          </Typography.Text>
          {!!_dec && (
            <Typography.Text
              className={classNames(`${prefixCls}-decimal`)}
              style={{ ...decimalStyle, fontWeight: weight, fontSize: decimalFontSize }}
            >
              {decimalSeparator}
              {_dec}
            </Typography.Text>
          )}
          {!!_abbreviation && (
            <Typography.Text
              className={classNames(`${prefixCls}-integer`)}
              style={{ ...intStyle, fontWeight: weight, fontSize: integerFontSize }}
            >
              {` ${_abbreviation}`}
            </Typography.Text>
          )}
          {suffix && (
            <Typography.Text
              className={classNames(`${prefixCls}-suffix`)}
              style={{ ...unitStyle, fontWeight: weight, fontSize: decimalFontSize }}
            >
              &nbsp;{suffix}
            </Typography.Text>
          )}
        </>
      )}
    </div>,
  );
};

export default Number;
