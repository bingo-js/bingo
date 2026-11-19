import { describe, expect, test } from 'vitest';

import { createBase } from '../creators/createBase.ts';
import { isBase } from './isBase.ts';

const base = createBase({
  options: {},
});

describe('isBase', () => {
  test.each([
    [null, false],
    [undefined, false],
    [123, false],
    ['abc', false],
    [{}, false],
    [{ createBlock: {}, createPreset: {}, options: {} }, false],
    [base, true],
  ])('%j', (input, expected) => {
    const actual = isBase(input);

    expect(actual).toBe(expected);
  });
});
