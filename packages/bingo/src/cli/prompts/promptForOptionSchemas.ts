import { describeOptions } from 'parse-standard-args';
import type {
  PromptedOptionsCancelled,
  PromptedOptionsCompleted,
} from 'parse-standard-args/prompts';
import { promptForOptions } from 'parse-standard-args/prompts';

import type { AnyShape, InferredObject } from '../../types/shapes.ts';
import type { SystemContext } from '../../types/system.ts';
import type { Template } from '../../types/templates.ts';

export interface PromptForOptionsSettings<OptionsShape extends AnyShape> {
  existing: Partial<InferredObject<OptionsShape>>;
  system: SystemContext;
}

export async function promptForOptionSchemas<OptionsShape extends AnyShape, Refinements>(
  template: Template<OptionsShape, Refinements>,
  { existing, system }: PromptForOptionsSettings<OptionsShape>,
): Promise<
  | PromptedOptionsCancelled
  | (PromptedOptionsCompleted & { completed: InferredObject<OptionsShape> })
> {
  const result = await promptForOptions({
    flags: describeOptions(template.options),
    values: {
      directory: system.directory,
      ...existing,
    },
  });

  if (result.cancelled) {
    return result;
  }

  // Prompted values are kept as entered, so they can be suggested as CLI flags.
  // Templates are given their schemas' outputs, such as transformed values.
  // Prompted values were already validated, and schemas must be synchronous.
  const outputs = Object.entries(result.prompted).map(([key, value]) => [
    key,
    (template.options[key]['~standard'].validate(value) as { value: unknown }).value,
  ]);

  return {
    ...result,
    completed: {
      ...result.completed,
      ...Object.fromEntries(outputs),
    } as InferredObject<OptionsShape>,
  };
}
