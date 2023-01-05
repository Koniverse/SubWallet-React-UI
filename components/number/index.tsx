import type { BigNumber } from 'bignumber.js';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { ConfigContext } from '../config-provider';
import useStyle from './style';
import type { NumberFormatter } from '../_util/number';
import { balanceFormatter, formatNumber } from '../_util/number';
import Typography from '../typography';

interface NumberProps {
  value: string | number | BigNumber;
  decimal: number;
  size?: number;
  subFloatNumber?: boolean;
  prefix?: string;
  suffix?: string;
  formatType?: 'default' | 'balance' | 'custom';
  customFormatter?: NumberFormatter;
  metadata?: Record<string, number>;
  className?: string;
  prefixCls?: string;
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

const Number: React.FC<NumberProps> = (props) => {
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
  } = props;

  const { getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('number', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const classNameExtend = useMemo((): string => classNames(hashId, className, prefixCls), []);
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
      console.log(e);

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
          style={{ fontSize: integerFontSize }}
        >
          {prefix}
        </Typography.Text>
      )}
      <Typography.Text
        className={classNames(`${prefixCls}-integer`)}
        style={{ fontSize: integerFontSize }}
      >
        {_int}
      </Typography.Text>
      {!!_dec && (
        <Typography.Text
          className={classNames(`${prefixCls}-decimal`)}
          style={{ fontSize: decimalFontSize }}
        >
          {decimalSeparator}
          {_dec}
        </Typography.Text>
      )}
      {suffix && (
        <Typography.Text
          className={classNames(`${prefixCls}-suffix`)}
          style={{ fontSize: integerFontSize }}
        >
          &nbsp;{suffix}
        </Typography.Text>
      )}
    </div>,
  );
};

export default Number;
