import type { CreatedDirectory } from 'bingo-fs';
import { describe, expect, test } from 'vitest';

import { mergeCreatedDirectories } from './mergeCreatedDirectories.ts';

describe(mergeCreatedDirectories, () => {
  test.each([
    [{}, {}, {}],
    [{ a: false }, { a: undefined }, {}],
    [{ a: '' }, { a: '' }, { a: '' }],
    [{ a: '' }, { b: '' }, { a: '', b: '' }],
    [{ a: {} }, { a: {} }, { a: {} }],
    [{ a: {} }, { a: { b: '' } }, { a: { b: '' } }],
    [{ a: { b: '' } }, { a: {} }, { a: { b: '' } }],
    [{ a: { b: '' } }, { a: { b: '' } }, { a: { b: '' } }],
  ] satisfies [CreatedDirectory, CreatedDirectory, CreatedDirectory][])(
    '%j with %j',
    (first: CreatedDirectory, second: CreatedDirectory, expected: object) => {
      expect(mergeCreatedDirectories(first, second)).toEqual(expected);
    },
  );

  test.each([
    [{ a: '1' }, { a: '2' }, "Conflicting created files at path: 'a'."],
    [{ a: '1' }, { a: ['2'] }, "Conflicting created files at path: 'a'."],
    [{ a: ['1'] }, { a: '2' }, "Conflicting created files at path: 'a'."],
    [{ a: ['1'] }, { a: ['2'] }, "Conflicting created files at path: 'a'."],
    [{ a: '' }, { a: {} }, "Conflicting created directory and file at path: 'a'."],
    [{ a: {} }, { a: '' }, "Conflicting created directory and file at path: 'a'."],
  ] satisfies [CreatedDirectory, CreatedDirectory, string][])(
    '%j with %j',
    (first: CreatedDirectory, second: CreatedDirectory, expected: string) => {
      expect(() => mergeCreatedDirectories(first, second)).toThrow(expected);
    },
  );
});
