import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

export const packageData =
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports -- Importing from above src/ would expand the TS build rootDir
  require('../package.json') as typeof import('../package.json');
