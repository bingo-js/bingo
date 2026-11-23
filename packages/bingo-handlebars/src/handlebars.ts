import { type CreatedEntry, intake } from 'bingo-fs';

import { executeTemplatesRecursive } from './executeTemplatesRecursive.ts';

export const handlebars = async (
  sourcePath: string,
  options?: object,
): Promise<CreatedEntry | undefined> => {
  const source = await intake(sourcePath);

  if (source === undefined) {
    throw new Error(
      `handlebars() must be given a path to a file or directory. '${sourcePath}' does not exist.`,
    );
  }

  return executeTemplatesRecursive(source, options);
};
