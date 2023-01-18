import type { BigNumber } from 'bignumber.js';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { ConfigContext } from '../config-provider';
import useStyle from './style';
import type { NumberFormatter } from '../_util/number';
import { balanceFormatter, formatNumber } from '../_util/number';
import Typography from '../typography';

export interface SWNumberProps {
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

  leftOpacity?: number;
  leftColor?: string;
  rightOpacity?: number;
  rightColor?: string;
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

const Number: React.FC<SWNumberProps> = (props) => {
  const { getPrefixCls } = React.useContext(ConfigContext);

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
    leftColor = '#FFF',
    leftOpacity = 1,
    rightColor = '#FFF',
    rightOpacity = 1,
    weight = 500,
  } = props;

  const leftStyle = useMemo(
    (): React.CSSProperties => ({
      color: leftColor,
      opacity: leftOpacity,
    }),
    [leftColor, leftOpacity],
  );

  const rightStyle = useMemo(
    (): React.CSSProperties => ({
      color: rightColor,
      opacity: rightOpacity,
    }),
    [rightColor, rightOpacity],
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

  const [_int, _dec] = useMemo((): [string, string] => {
    const [int, dec] = formatted.split('.');

    return [intToLocaleString(int, thousandSeparator), dec];
  }, [formatted]);

  return wrapSSR(
    <div className={classNames(classNameExtend)}>
      {prefix && (
        <Typography.Text
          className={classNames(`${prefixCls}-prefix`)}
          style={{ ...leftStyle, fontWeight: weight, fontSize: integerFontSize }}
        >
          {prefix}
        </Typography.Text>
      )}
      <Typography.Text
        className={classNames(`${prefixCls}-integer`)}
        style={{ ...leftStyle, fontWeight: weight, fontSize: integerFontSize }}
      >
        {_int}
      </Typography.Text>
      {!!_dec && (
        <Typography.Text
          className={classNames(`${prefixCls}-decimal`)}
          style={{ ...rightStyle, fontWeight: weight, fontSize: decimalFontSize }}
        >
          {decimalSeparator}
          {_dec}
        </Typography.Text>
      )}
      {suffix && (
        <Typography.Text
          className={classNames(`${prefixCls}-suffix`)}
          style={{ ...rightStyle, fontWeight: weight, fontSize: decimalFontSize }}
        >
          &nbsp;{suffix}
        </Typography.Text>
      )}
    </div>,
  );
};

export default Number;
