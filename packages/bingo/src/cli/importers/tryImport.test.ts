import path from 'node:path';

import { describe, expect, it, vi } from 'vitest';

import { tryImport } from './tryImport.js';

const mockImportModule = vi.fn<(specifier: string) => Promise<object>>();

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
  it('returns the error when import rejects', async () => {
    const error = new Error('Oh no!');

    mockImportModule.mockRejectedValueOnce(error);

    const actual = await tryImport('bingo-my-app', mockImportModule);

    expect(actual).toEqual(error);
    expect(mockImportModule).toHaveBeenCalledWith(path.join(process.cwd(), 'bingo-my-app'));
    expect(mockSpinner.start).toHaveBeenCalledTimes(1);
    expect(mockSpinner.cancel).toHaveBeenCalledTimes(1);
    expect(mockSpinner.stop).not.toHaveBeenCalled();
  });

  it('returns the object when import resolves', async () => {
    const importedObject = { isTemplate: true };

    mockImportModule.mockResolvedValueOnce(importedObject);

    const actual = await tryImport('bingo-my-app', mockImportModule);

    expect(actual).toEqual(importedObject);
    expect(mockSpinner.start).toHaveBeenCalledTimes(1);
    expect(mockSpinner.cancel).not.toHaveBeenCalled();
    expect(mockSpinner.stop).toHaveBeenCalledTimes(1);
  });
});
