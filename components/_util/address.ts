// eslint-disable-next-line import/prefer-default-export
export function toShort(text: string, preLength = 6, sufLength = 6): string {
  if (!sufLength && text.length > preLength) {
    return `${text.slice(0, preLength)}…`;
  }

  if (text.length > preLength + sufLength + 1) {
    return `${text.slice(0, preLength)}…${text.slice(-sufLength)}`;
  }

  return text;
}
