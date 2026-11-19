import { describe, expect, it } from 'vitest';

import { pickKeys } from './pickKeys.ts';

describe(pickKeys, () => {
  it('picks only keys that are present in the values', () => {
    expect(pickKeys({ a: 1, b: 2, c: undefined }, ['a', 'c', 'd'])).toEqual({ a: 1, c: undefined });
  });
});
