import BigNumber from 'bignumber.js';

export const BN_TEN = new BigNumber(10);
export interface NumberFormatter {
  (input: string, metadata?: Record<string, number>): string;
}

// Clear zero from end, use with decimal only
const clearZero = (result: string): string => {
  let index = result.length - 1;
  while (result[index] === '0') {
    result = result.slice(0, index);
    index--;
  }

  return result;
};

export const balanceFormatter: NumberFormatter = (
  input: string,
  metadata?: Record<string, number>,
): string => {
  const absGteOne = new BigNumber(input).abs().gte(1);
  const minNumberFormat = metadata?.minNumberFormat || 2;
  const maxNumberFormat = metadata?.maxNumberFormat || 6;
  const [int, decimal] = input.split('.');
  let _decimal = '';

  if (absGteOne) {
    const intNumber = new BigNumber(int);
    const max = BN_TEN.pow(maxNumberFormat);

    // If count of number in integer part greater or equal maxNumberFormat, do not show decimal
    if (intNumber.gte(max)) {
      return int;
    }

    // Get only minNumberFormat number at decimal
    if (decimal.length <= minNumberFormat) {
      _decimal = decimal;
    } else {
      _decimal = decimal.slice(0, minNumberFormat);
    }

    // Clear zero number for decimal
    _decimal = clearZero(_decimal);
  } else {
    // Index of cursor
    let index = 0;

    // Count of not zero number in decimal
    let current = 0;

    // Find a not zero number in decimal
    let metNotZero = false;

    // Get at least minNumberFormat number not 0 from index 0
    // If count of 0 number at prefix greater or equal maxNumberFormat should stop and return 0

    // current === minNumberFormat: get enough number
    // index === decimal.length: end of decimal
    // index === maxNumberFormat: reach limit of 0 number at prefix
    while (
      current < minNumberFormat &&
      index < decimal.length &&
      (index < maxNumberFormat || metNotZero)
    ) {
      const _char = decimal[index];
      _decimal += _char;
      index++;
      if (_char !== '0') {
        metNotZero = true;
      }

      if (metNotZero) {
        current++;
      }
    }

    // Clear zero number for decimal
    _decimal = clearZero(_decimal);
  }

  if (_decimal) {
    return `${int}.${_decimal}`;
  }

  return int;
};

export const PREDEFINED_FORMATTER: Record<string, NumberFormatter> = {
  balance: balanceFormatter,
};

export const toBNString = (input: string | number | BigNumber, decimal: number): string => {
  const raw = new BigNumber(input);
  return raw.multipliedBy(BN_TEN.pow(decimal)).toFixed();
};

export const formatNumber = (
  input: string | number | BigNumber,
  decimal: number,
  formatter: NumberFormatter,
  metadata?: Record<string, number>,
): string => {
  const raw = new BigNumber(input).dividedBy(BN_TEN.pow(decimal)).toFixed();

  return formatter(raw, metadata);
};
