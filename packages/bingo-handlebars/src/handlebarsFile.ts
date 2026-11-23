import { type CreatedEntry, intake, isFile } from 'bingo-fs';

import { executeTemplatesRecursive } from './executeTemplatesRecursive.ts';

export const handlebarsFile = async (
  sourcePath: string,
  options?: object,
): Promise<CreatedEntry | undefined> => {
  const source = await intake(sourcePath);

  if (source === undefined) {
    throw new Error(
      `handlebarsDirectory() must be given a path to a file or directory. '${sourcePath}' does not exist.`,
    );
  }

  if (!isFile(source)) {
    throw new Error(
      `handlebarsDirectory() must be given a path to a file. '${sourcePath}' is a directory.`,
    );
  }

  return executeTemplatesRecursive(source, options);
};
