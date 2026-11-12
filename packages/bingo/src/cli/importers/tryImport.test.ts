import path from 'node:path';

import { describe, expect, it, vi } from 'vitest';

import { tryImport } from './tryImport.js';

const mockTryCatchError = vi.fn();

vi.mock('../../utils/tryCatch.js', () => ({
  get tryCatchError() {
    return mockTryCatchError;
  },
}));

const mockLog = {
  error: vi.fn(),
};
const mockSpinner = {
  cancel: vi.fn(),
  clear: vi.fn(),
  error: vi.fn(),
  isCancelled: false,
  message: vi.fn(),
  start: vi.fn(),
  stop: vi.fn(),
};
vi.mock('@clack/prompts', () => ({
  get log() {
    return mockLog;
  },
  spinner: () => mockSpinner,
}));

describe(tryImport, () => {
  it('returns the error when tryCatchError resolves with an error', async () => {
    const error = new Error('Oh no!');

    mockTryCatchError.mockResolvedValueOnce(error);

    const from = path.relative(
      process.cwd(),
      path.resolve(import.meta.dirname, '../../utils/tryCatch.js'),
    );
    const actual = await tryImport(from);

    expect(actual).toEqual(error);
    expect(mockTryCatchError).toHaveBeenCalledTimes(1);
    expect(mockSpinner.start).toHaveBeenCalledTimes(1);
    expect(mockSpinner.cancel).toHaveBeenCalledTimes(1);
    expect(mockSpinner.stop).not.toHaveBeenCalled();
  });

  it('returns the object when tryCatchError resolves with an object', async () => {
    const importedObject = { isTemplate: true };

    mockTryCatchError.mockResolvedValueOnce(importedObject);

    const from = path.relative(
      process.cwd(),
      path.resolve(import.meta.dirname, '../../utils/tryCatch.js'),
    );
    const actual = await tryImport(from);

    expect(actual).toEqual(importedObject);
    expect(mockSpinner.start).toHaveBeenCalledTimes(1);
    expect(mockSpinner.cancel).not.toHaveBeenCalled();
    expect(mockSpinner.stop).toHaveBeenCalledTimes(1);
  });
});
