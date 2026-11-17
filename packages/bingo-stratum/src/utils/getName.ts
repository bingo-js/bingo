import type { AboutBase } from 'bingo';

export function getName(value: { about?: AboutBase }) {
  return value.about?.name ?? '(anonymous)';
}
