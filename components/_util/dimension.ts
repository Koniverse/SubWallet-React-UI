export const formatPxNumber = (input: string | number, suffix = 'px') => {
  if (typeof input === 'number') {
    return `${input}${suffix}`;
  }
  return input;
};

export const formatPxNumbers = (inputs: Array<string | number>, suffix = 'px') =>
  inputs.map((i) => formatPxNumber(i, suffix));
