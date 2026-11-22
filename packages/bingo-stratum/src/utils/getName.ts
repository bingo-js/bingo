import type { AboutBase } from 'bingo';

export const getName = (value: { about?: AboutBase }): string => {
  return value.about?.name ?? '(anonymous)';
};
