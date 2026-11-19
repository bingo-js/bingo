import { type AnyShape, type InferredObject, produceTemplate, type Template } from 'bingo';
import type { BingoSystem } from 'bingo-systems';

import { createMockSystems } from './createMockSystems.ts';

export interface TestProductionSettingsBase {
  system?: Omit<Partial<BingoSystem>, 'take'>;
}

export interface TestTemplateProductionSettings<
  OptionsShape extends AnyShape,
> extends TestProductionSettingsBase {
  options: InferredObject<OptionsShape>;
}

export async function testTemplate<OptionsShape extends AnyShape, Refinements>(
  template: Template<OptionsShape, Refinements>,
  settings: TestTemplateProductionSettings<OptionsShape>,
) {
  const { system } = createMockSystems(settings.system);

  return await produceTemplate(template, { ...settings, ...system });
}
