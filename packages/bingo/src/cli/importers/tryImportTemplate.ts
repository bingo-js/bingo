import { isTemplate } from '../../predicates/isTemplate.ts';
import { tryImportWithPredicate } from '../tryImportWithPredicate.ts';
import { tryImport } from './tryImport.ts';

export async function tryImportTemplate(from: string) {
  return await tryImportWithPredicate(
    async () => await tryImport(from),
    from,
    isTemplate,
    'Template',
  );
}
