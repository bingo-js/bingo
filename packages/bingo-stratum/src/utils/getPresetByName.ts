import type { AnyShape } from 'bingo';

import type { Preset } from '../types/presets.ts';
import { slugifyName } from './slugifyName.ts';

export const getPresetByName = <OptionsShape extends AnyShape>(
  presets: Preset<OptionsShape>[],
  requested: string,
): Preset<OptionsShape> | Error => {
  const presetsByName = new Map(
    Array.from(presets.map((preset) => [slugifyName(preset.about.name), preset])),
  );

  return (
    presetsByName.get(slugifyName(requested)) ??
    new Error(`${requested} is not one of: ${Array.from(presetsByName.keys()).join(', ')}`)
  );
};
