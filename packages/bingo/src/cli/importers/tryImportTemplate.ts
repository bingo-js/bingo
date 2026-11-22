import { isTemplate } from '../../predicates/isTemplate.ts';
import type { Template } from '../../types/templates.ts';
import { tryImportWithPredicate } from '../tryImportWithPredicate.ts';
import { tryImport } from './tryImport.ts';

export const tryImportTemplate = async (from: string): Promise<Error | Template> => {
  return await tryImportWithPredicate(
    async () => await tryImport(from),
    from,
    isTemplate,
    'Template',
  );
};
