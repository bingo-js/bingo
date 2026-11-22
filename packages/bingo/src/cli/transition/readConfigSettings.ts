import path from 'node:path';

import { tryImportConfig } from '../../config/tryImportConfig.ts';
import type { TemplateConfig } from '../../types/configs.ts';
import type { AnyShape } from '../../types/shapes.ts';
import type { Template } from '../../types/templates.ts';
import { templateMismatchError } from './templateMismatchError.ts';

export const readConfigSettings = async <OptionsShape extends AnyShape, Refinements>(
  configFile: string | undefined,
  directory: string,
  template: Template<OptionsShape, Refinements>,
): Promise<Error | TemplateConfig<OptionsShape, Refinements> | undefined> => {
  if (!configFile) {
    return undefined;
  }

  const relativeConfigFile = path.join(process.cwd(), directory, configFile);
  const contents = (await tryImportConfig(relativeConfigFile)) as
    | Error
    | TemplateConfig<OptionsShape, Refinements>;

  if (contents instanceof Error) {
    return contents;
  }

  if (contents.template !== template) {
    return templateMismatchError(contents.template, template);
  }

  return contents;
};
