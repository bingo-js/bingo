import { slugifyName } from './slugifyName.ts';

export const createBlockRefinementOption = (prefix: string, blockName: string): string => {
  return `${prefix}-${slugifyName(blockName)}`;
};
