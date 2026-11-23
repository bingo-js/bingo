import type { AnyShape } from 'bingo';

import type { BaseDefinition } from '../types/bases.ts';

export const assertNoPresetOption = <OptionsShape extends AnyShape>(
  baseDefinition: BaseDefinition<OptionsShape>,
): void => {
  // https://github.com/typescript-eslint/typescript-eslint/issues/6632
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (baseDefinition.options.preset) {
    throw new Error(`Bases should not declare a preset option.`);
  }
};
