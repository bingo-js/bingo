import { slugifyName } from './slugifyName.ts';

export function createBlockRefinementOption(prefix: string, blockName: string) {
  return `${prefix}-${slugifyName(blockName)}`;
}
