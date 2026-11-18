import { base } from '@bingo/build/tsdown';
import { defineConfig, type UserConfig } from 'tsdown';

const config: UserConfig = defineConfig({
  ...base,
  entry: ['src/index.ts', 'src/bin/index.ts'],
  exports: {
    ...(base.exports && typeof base.exports === 'object' ? base.exports : {}),
    exclude: ['bin/index'],
  },
});

export default config;
