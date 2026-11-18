import type { BingoSystem } from 'bingo-systems';
import { describe, expect, it, vi } from 'vitest';

import type { Template } from '../../types/templates.ts';
import type { ClackDisplay } from '../display/createClackDisplay.ts';
import { resolveLocalRepository } from './resolveLocalRepository.ts';

const mockGetGitRepositoryType = vi.fn();

vi.mock('../getGitRepositoryType.js', async () => ({
  ...(await vi.importActual('../getGitRepositoryType.js')),
  get getGitRepositoryType() {
    return mockGetGitRepositoryType;
  },
}));

const mockCreateRemoteRepository = vi.fn();

vi.mock('../remotes/createRemoteRepository.js', () => ({
  get createRemoteRepository() {
    return mockCreateRemoteRepository;
  },
}));

const mockResolveRemoteRepositoryFromOrigin = vi.fn();

vi.mock('../remotes/resolveRemoteRepositoryFromOrigin.js', () => ({
  get resolveRemoteRepositoryFromOrigin() {
    return mockResolveRemoteRepositoryFromOrigin;
  },
}));

const mockResolveRemoteRepositoryToCreate = vi.fn();

vi.mock('../remotes/resolveRemoteRepositoryToCreate.js', () => ({
  get resolveRemoteRepositoryToCreate() {
    return mockResolveRemoteRepositoryToCreate;
  },
}));

const stubOrigin = 'stub-origin';
const stubRepository = 'stub-repository';

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

describe(resolveLocalRepository, () => {
  it('returns a remote error when both requests.remote and offline are true', async () => {
    mockGetGitRepositoryType.mockResolvedValueOnce('root');

    const actual = await resolveLocalRepository(
      stubDisplay,
      { repository: stubRepository },
      { offline: true, remote: true },
      {} as BingoSystem,
      {} as Template,
    );

    expect(actual).toEqual({
      remote: new Error('--offline cannot be combined with --remote.'),
      repositoryType: 'root',
    });
    expect(mockResolveRemoteRepositoryFromOrigin).not.toHaveBeenCalled();
  });

  it('returns no remote when requests.remote is falsy and offline is true', async () => {
    mockGetGitRepositoryType.mockResolvedValueOnce('root');

    const actual = await resolveLocalRepository(
      stubDisplay,
      { repository: stubRepository },
      { offline: true, remote: false },
      {} as BingoSystem,
      {} as Template,
    );

    expect(actual).toEqual({
      remote: undefined,
      repositoryType: 'root',
    });
    expect(mockResolveRemoteRepositoryFromOrigin).not.toHaveBeenCalled();
  });

  it('returns no remote when in a Git subdirectory and request.remote is falsy', async () => {
    mockGetGitRepositoryType.mockResolvedValueOnce('subdirectory');

    const actual = await resolveLocalRepository(
      stubDisplay,
      { repository: stubRepository },
      {},
      {} as BingoSystem,
      {} as Template,
    );

    expect(actual).toEqual({
      remote: undefined,
      repositoryType: 'subdirectory',
    });
  });

  it('returns a remote error when in a Git subdirectory and request.remote is true', async () => {
    mockGetGitRepositoryType.mockResolvedValueOnce('subdirectory');

    const actual = await resolveLocalRepository(
      stubDisplay,
      { repository: stubRepository },
      { remote: true },
      {} as BingoSystem,
      {} as Template,
    );

    expect(actual).toEqual({
      remote: new Error(
        '--remote can only be used when in a non-Git directory or in the root of a Git directory.',
      ),
      repositoryType: 'subdirectory',
    });
  });

  it('returns the origin when it already exists and request.remote is falsy', async () => {
    mockGetGitRepositoryType.mockResolvedValueOnce('root');
    mockResolveRemoteRepositoryFromOrigin.mockResolvedValueOnce({
      owner: stubOrigin,
      repository: stubRepository,
    });

    const actual = await resolveLocalRepository(
      stubDisplay,
      { repository: stubRepository },
      {},
      {} as BingoSystem,
      {} as Template,
    );

    expect(actual).toEqual({
      message: {
        level: 'step',
        text: `Detected existing remote origin repository`,
      },
      remote: {
        owner: stubOrigin,
        repository: stubRepository,
      },
      repositoryType: 'root',
    });
  });

  it('returns an error when an origin already exists and request.remote is true', async () => {
    mockGetGitRepositoryType.mockResolvedValueOnce('root');
    mockResolveRemoteRepositoryFromOrigin.mockResolvedValueOnce({
      owner: stubOrigin,
      repository: stubRepository,
    });

    const actual = await resolveLocalRepository(
      stubDisplay,
      { repository: stubRepository },
      { remote: true },
      {} as BingoSystem,
      {} as Template,
    );

    expect(actual).toEqual({
      remote: new Error('--remote requested, but an origin remote already exists.'),
      repositoryType: 'root',
    });
  });

  it('returns no remote when there is no existing origin and both requests.remote and offline are falsy', async () => {
    mockGetGitRepositoryType.mockResolvedValueOnce('root');
    mockResolveRemoteRepositoryFromOrigin.mockResolvedValueOnce(undefined);

    const actual = await resolveLocalRepository(
      stubDisplay,
      { repository: stubRepository },
      {},
      {} as BingoSystem,
      {} as Template,
    );

    expect(actual).toEqual({
      remote: undefined,
      repositoryType: 'root',
    });
  });

  it('returns a remote error when there is no existing origin, requests.remote is true, and there is no Octokit fetcher', async () => {
    mockGetGitRepositoryType.mockResolvedValueOnce('root');
    mockResolveRemoteRepositoryFromOrigin.mockResolvedValueOnce(undefined);

    const actual = await resolveLocalRepository(
      stubDisplay,
      { repository: stubRepository },
      { remote: true },
      { fetchers: {} } as BingoSystem,
      {} as Template,
    );

    expect(actual).toEqual({
      remote: new Error(
        '--remote requested, but no existing repository or GitHub authentication found. Please log in with the GitHub CLI or set a GH_AUTH env variable.',
      ),
      repositoryType: 'root',
    });
  });

  it('returns the error when resolving a remote repository to create fails', async () => {
    mockGetGitRepositoryType.mockResolvedValueOnce('root');
    const creationLocator = new Error('Could not create remote.');

    mockResolveRemoteRepositoryFromOrigin.mockResolvedValueOnce(undefined);
    mockResolveRemoteRepositoryToCreate.mockResolvedValueOnce(creationLocator);

    const actual = await resolveLocalRepository(
      stubDisplay,
      { repository: stubRepository },
      { remote: true },
      { fetchers: { octokit: {} } } as BingoSystem,
      {} as Template,
    );

    expect(actual).toEqual({
      remote: creationLocator,
      repositoryType: 'root',
    });
  });

  it('returns the error when resolving a remote repository to create succeeds and creating a new repository fails', async () => {
    mockGetGitRepositoryType.mockResolvedValueOnce('root');
    const creationError = new Error('Could not create repository.');

    mockResolveRemoteRepositoryFromOrigin.mockResolvedValueOnce(undefined);
    mockResolveRemoteRepositoryToCreate.mockResolvedValueOnce({
      owner: stubOrigin,
      repository: stubRepository,
    });
    mockCreateRemoteRepository.mockResolvedValueOnce(creationError);

    const actual = await resolveLocalRepository(
      stubDisplay,
      { repository: stubRepository },
      { remote: true },
      { fetchers: { octokit: {} } } as BingoSystem,
      {} as Template,
    );

    expect(actual).toEqual({
      remote: creationError,
      repositoryType: 'root',
    });
  });

  it('returns the locator when resolving a remote repository to create succeeds and creating a new repository succeeds', async () => {
    mockGetGitRepositoryType.mockResolvedValueOnce('root');
    const creationLocator = {
      owner: stubOrigin,
      repository: stubRepository,
    };

    mockResolveRemoteRepositoryFromOrigin.mockResolvedValueOnce(undefined);
    mockResolveRemoteRepositoryToCreate.mockResolvedValueOnce(creationLocator);
    mockCreateRemoteRepository.mockResolvedValueOnce(creationLocator);

    const actual = await resolveLocalRepository(
      stubDisplay,
      { repository: stubRepository },
      { remote: true },
      { fetchers: { octokit: {} } } as BingoSystem,
      {} as Template,
    );

    expect(actual).toEqual({
      remote: creationLocator,
      repositoryType: 'root',
    });
  });
});
