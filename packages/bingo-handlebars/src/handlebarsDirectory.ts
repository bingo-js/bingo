import { type CreatedFileEntry, intake, isFile } from 'bingo-fs';

import { executeTemplatesRecursive } from './executeTemplatesRecursive.ts';

export const handlebarsDirectory = async (
  sourcePath: string,
  options?: object,
): Promise<CreatedFileEntry | undefined> => {
  const source = await intake(sourcePath);

  if (!source) {
    throw new Error(
      `handlebarsDirectory() must be given a path to a directory. '${sourcePath}' does not exist.`,
    );
  }

  if (isFile(source)) {
    throw new Error(
      `handlebarsDirectory() must be given a path to a directory. '${sourcePath}' is a file.`,
    );
  }

  return executeTemplatesRecursive(source, options);
};
