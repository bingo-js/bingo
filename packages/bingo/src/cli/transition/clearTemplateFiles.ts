import * as fs from 'node:fs/promises';

export const clearTemplateFiles = async (directory: string): Promise<void> => {
  const children = await fs.readdir(directory);

  await Promise.all(
    children
      .filter((child) => child !== '.git')
      .map(async (child) => {
        await fs.rm(child, { recursive: true });
      }),
  );
};
