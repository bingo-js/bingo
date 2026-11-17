import { describe, expect, test } from 'vitest';

import { isModeExecutable } from './isModeExecutable.ts';

describe('isModeExecutable', () => {
  test.each([
    ['0o755', 0o755, true],
    ['0o777', 0o777, true],
    ['0o644', 0o644, false],
    ['0x755 (legacy hex fallback)', 0x755, true],
    ['0x644 (legacy hex fallback)', 0x644, false],
  ])('%s is %j', (_label, mode, expected) => {
    expect(isModeExecutable(mode)).toBe(expected);
  });
});
