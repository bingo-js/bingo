export const makeRelative = (item: string): string => {
  return item.startsWith('.') ? item : `./${item}`;
};

export const quoteIfSpaced = (text: string): string => {
  return text.includes(' ') ? `"${text}"` : text;
};
