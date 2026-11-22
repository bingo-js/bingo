import { tryImportWithPredicate } from '../cli/tryImportWithPredicate.ts';
import { isTemplateConfig } from '../predicates/isTemplateConfig.ts';
import type { TemplateConfig } from '../types/configs.ts';
import type { AnyShape } from '../types/shapes.ts';

export const tryImportConfig = async (
  configFile: string,
): Promise<Error | TemplateConfig<AnyShape, unknown>> => {
  return await tryImportWithPredicate(
    async (moduleName) => (await import(moduleName)) as object,
    configFile,
    isTemplateConfig,
    'config from createConfig()',
  );
};
