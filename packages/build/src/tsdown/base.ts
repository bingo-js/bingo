import type { UserConfig } from 'tsdown';

export const base: UserConfig = {
  attw: {
    enabled: 'ci-only',
    profile: 'esm-only',
  },
  clean: ['./node_modules/.cache/tsbuild/'],
  dts: { tsc: { build: true, incremental: true } },
  entry: ['src/index.ts'],
  exports: {
    devExports: true,
  },
};
