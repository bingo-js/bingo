import { readdirSync } from 'node:fs';
import path from 'node:path';

import { defaultExclude, defineConfig, type ViteUserConfigExport } from 'vitest/config';

const config: ViteUserConfigExport = defineConfig({
  test: {
    coverage: {
      exclude: [...defaultExclude, '**/config.ts', '**/*.astro'],
      include: ['packages/*/src/**/*.ts'],
      reporter: ['html', 'lcov', 'text'],
    },

    projects: readdirSync(path.join(import.meta.dirname, 'packages')).map((name) => ({
      test: {
        clearMocks: true,
        include: ['**/src/**/*.test.ts'],
        name,
        root: path.join(import.meta.dirname, 'packages', name),
        setupFiles: ['console-fail-test/setup'],
      },
    })),
  },
});

export default config;
