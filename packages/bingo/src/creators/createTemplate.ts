import type { AnyShape } from '../types/shapes.ts';
import type { Template, TemplateDefinition } from '../types/templates.ts';

/**
 * Definition for creating a new Template.
 * @see {@link Template}
 * @see {@link TemplateDefinition}
 * @see {@link https://create.bingo/build/apis/create-template}
 */
export function createTemplate<OptionsShape extends AnyShape, Refinements>(
  definition: TemplateDefinition<OptionsShape, Refinements>,
): Template<OptionsShape, Refinements>;
export function createTemplate<Customizations>(
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  definition: TemplateDefinition<{}, Customizations>,
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
): Template<{}, Customizations>;
export function createTemplate<OptionsShape extends AnyShape, Refinements>(
  definition: TemplateDefinition<OptionsShape, Refinements>,
): Template<OptionsShape, Refinements> {
  const template: Template<OptionsShape, Refinements> = {
    createConfig: (config) => ({ ...config, template }),
    // Fudging the types a bit: without options, the shape is {}.
    options: (definition.options ?? {}) as OptionsShape,
    ...definition,
  };

  return template;
}
