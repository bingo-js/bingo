import { base } from '@bingo/build/tsdown';
import { defineConfig, type UserConfig } from 'tsdown';

const config: UserConfig = defineConfig({
  ...base,
});

export default config;
