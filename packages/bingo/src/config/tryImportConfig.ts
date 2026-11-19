import { tryImportWithPredicate } from '../cli/tryImportWithPredicate.ts';
import { isTemplateConfig } from '../predicates/isTemplateConfig.ts';

export async function tryImportConfig(configFile: string) {
  return await tryImportWithPredicate(
    async (moduleName) => (await import(moduleName)) as object,
    configFile,
    isTemplateConfig,
    'config from createConfig()',
  );
}
