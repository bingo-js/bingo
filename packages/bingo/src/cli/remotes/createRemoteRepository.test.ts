import { styleText } from 'node:util';

import type { BingoSystem } from 'bingo-systems';
import { describe, expect, it, vi } from 'vitest';

import type { Template } from '../../types/templates.ts';
import type { ClackDisplay } from '../display/createClackDisplay.ts';
import { createRemoteRepository } from './createRemoteRepository.ts';

const mockLog = {
  error: vi.fn(),
  step: vi.fn(),
};

vi.mock('@clack/prompts', () => ({
  get log() {
    return mockLog;
  },
}));

const mockNewGitHubRepository = vi.fn();

vi.mock('new-github-repository', () => ({
  get newGitHubRepository() {
    return mockNewGitHubRepository;
  },
}));

const mockPrepareGitRepository = vi.fn();

vi.mock('../repository/prepareGitRepository.js', () => ({
  get prepareGitRepository() {
    return mockPrepareGitRepository;
  },
}));

const stubDisplay: ClackDisplay = {
  dumpItems: vi.fn(),
  item: vi.fn(),
  log: vi.fn(),
  spinner: {
    cancel: vi.fn(),
    clear: vi.fn(),
    error: vi.fn(),
    isCancelled: false,
    message: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
  },
};

const stubLocator = { owner: 'owner', repository: 'repository' };

const stubSystem = { fetchers: {} } as BingoSystem;

describe(createRemoteRepository, () => {
  it('returns the error without logging when creating the remote repository fails', async () => {
    const creationError = new Error('Creation failed.');

    mockNewGitHubRepository.mockRejectedValueOnce(creationError);

    const actual = await createRemoteRepository(
      stubDisplay,
      stubLocator,
      stubSystem,
      {} as Template,
    );

    expect(actual).toBe(creationError);
    expect(mockLog.step).not.toHaveBeenCalled();
  });

  it('logs when creating the remote repository succeeds', async () => {
    const actual = await createRemoteRepository(
      stubDisplay,
      stubLocator,
      stubSystem,
      {} as Template,
    );

    expect(actual).toBe(undefined);
    expect(mockNewGitHubRepository).toHaveBeenCalledWith(
      expect.objectContaining({ private: false }),
    );
    expect(mockLog.step).toHaveBeenCalledWith(
      [
        "You've got a new repository ready to use in:",
        `  ${styleText('green', `https://github.com/owner/repository`)}`,
      ].join('\n'),
    );
  });

  it('creates a private GitHub repository when private visibility is requested', async () => {
    mockNewGitHubRepository.mockClear();

    const actual = await createRemoteRepository(
      stubDisplay,
      stubLocator,
      stubSystem,
      {} as Template,
      'private',
    );

    expect(actual).toBe(undefined);
    expect(mockNewGitHubRepository).toHaveBeenCalledWith(
      expect.objectContaining({ private: true }),
    );
  });
});
