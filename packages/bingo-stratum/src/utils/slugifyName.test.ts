import { describe, expect, it } from 'vitest';

import { slugifyName } from './slugifyName.js';

describe('slugifyName', () => {
  it('converts to lowercase and replaces spaces with dashes', () => {
    expect(slugifyName('Foo Bar')).toBe('foo-bar');
  });

  it('replaces dots with dashes', () => {
    expect(slugifyName('Readme.md')).toBe('readme-md');
    expect(slugifyName('Next.js')).toBe('next-js');
  });

  it('preserves single words', () => {
    expect(slugifyName('ESLint')).toBe('eslint');
  });
});
