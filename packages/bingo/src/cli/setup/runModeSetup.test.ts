import { styleText } from 'node:util';

import { describe, expect, it, vi } from 'vitest';
import { z } from 'zod';

import { createTemplate } from '../../creators/createTemplate.ts';
import type { ClackDisplay } from '../display/createClackDisplay.ts';
import { cliMessages } from '../messages.ts';
import { cliStatuses } from '../status.ts';
import { logRerunSuggestion } from '../loggers/logRerunSuggestion.ts';
import { runModeSetup } from './runModeSetup.ts';

const mockCancel = Symbol('cancel');

const mockLog = {
  error: vi.fn(),
  info: vi.fn(),
  message: vi.fn(),
  warn: vi.fn(),
};

vi.mock('@clack/prompts', () => ({
  isCancel: (value: unknown) => value === mockCancel,
  get log() {
    return mockLog;
  },
}));

const mockSystem = {
  fetchers: {
    octokit: {},
  },
  runner: vi.fn(),
};

vi.mock('../../contexts/createSystemContextWithAuth.js', () => ({
  get createSystemContextWithAuth() {
    return vi.fn().mockResolvedValue(mockSystem);
  },
}));

vi.mock('../loggers/logRerunSuggestion.js');

const mockLogStartText = vi.fn();

vi.mock('../loggers/logStartText', () => ({
  get logStartText() {
    return mockLogStartText;
  },
}));

const mockPrepareOptions = vi.fn();

vi.mock('../../preparation/prepareOptions.js', () => ({
  get prepareOptions() {
    return mockPrepareOptions;
  },
}));

const mockPrepareGitRepository = vi.fn();

vi.mock('../repository/prepareGitRepository.ts', () => ({
  get prepareGitRepository() {
    return mockPrepareGitRepository;
  },
}));

const mockResolveLocalRepository = vi.fn();

vi.mock('../repository/resolveLocalRepository.ts', () => ({
  get resolveLocalRepository() {
    return mockResolveLocalRepository;
  },
}));

const mockPromptForDirectory = vi.fn();

vi.mock('../prompts/promptForDirectory.ts', () => ({
  get promptForDirectory() {
    return mockPromptForDirectory;
  },
}));

const mockPromptForOptionSchemas = vi.fn();

vi.mock('../prompts/promptForOptionSchemas.ts', () => ({
  get promptForOptionSchemas() {
    return mockPromptForOptionSchemas;
  },
}));

const mockRunTemplate = vi.fn();

vi.mock('../../runners/runTemplate.ts', () => ({
  get runTemplate() {
    return mockRunTemplate;
  },
}));

const argv = ['npx', 'bingo-my-app'];

const from = 'create-example';

const rerunCommand = 'npx create-example';

const display: ClackDisplay = {
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

const template = createTemplate({
  about: { name: 'Test Template' },
  options: {
    value: z.string().optional(),
  },
  produce: vi.fn(),
});

describe(runModeSetup, () => {
  it('returns a cancellation status when the directory prompt is cancelled', async () => {
    mockPromptForDirectory.mockResolvedValueOnce(undefined);

    const actual = await runModeSetup({
      argv,
      display,
      from,
      rerunCommand,
      template,
    });

    expect(actual).toEqual({
      status: cliStatuses.cancelled,
    });
  });

  it('returns an error status when preparing options results in an error', async () => {
    mockPromptForDirectory.mockResolvedValueOnce('test-directory');
    mockPrepareOptions.mockResolvedValueOnce(new Error('Oh no!'));

    const actual = await runModeSetup({
      argv,
      display,
      from,
      rerunCommand,
      template,
    });

    expect(actual).toEqual({
      status: cliStatuses.error,
    });
  });

  it('returns a cancellation status when prompting for options is cancelled', async () => {
    mockPromptForDirectory.mockResolvedValueOnce('test-directory');
    mockPromptForOptionSchemas.mockResolvedValueOnce({
      cancelled: true,
      prompted: {},
    });

    const actual = await runModeSetup({
      argv,
      display,
      from,
      rerunCommand,
      template,
    });

    expect(actual).toEqual({
      status: cliStatuses.cancelled,
    });
  });

  it('preserves private remote options in rerun suggestions', async () => {
    vi.mocked(logRerunSuggestion).mockClear();
    mockPromptForDirectory.mockResolvedValueOnce('test-directory');
    mockPromptForOptionSchemas.mockResolvedValueOnce({
      cancelled: false,
      prompted: {},
    });
    mockResolveLocalRepository.mockResolvedValueOnce({
      remote: new Error('Remote error.'),
    });

    await runModeSetup({
      argv,
      display,
      from,
      remote: true,
      repoVisibility: 'private',
      rerunCommand,
      template,
    });

    expect(logRerunSuggestion).toHaveBeenCalledWith(rerunCommand, {
      remote: true,
      'repo-visibility': 'private',
    });
  });

  it('returns the error when resolving a remote repository results in an error', async () => {
    const remote = new Error('Remote error.');

    mockPromptForDirectory.mockResolvedValueOnce('test-directory');
    mockPromptForOptionSchemas.mockResolvedValueOnce({
      cancelled: false,
      prompted: {},
    });
    mockResolveLocalRepository.mockResolvedValueOnce({ remote });

    const actual = await runModeSetup({
      argv,
      display,
      from,
      rerunCommand,
      template,
    });

    expect(actual).toEqual({
      error: remote,
      status: cliStatuses.error,
    });
  });

  it('returns the error when creating a remote repository results in an error', async () => {
    const remoteText = 'To create remote.';

    mockPromptForDirectory.mockResolvedValueOnce('test-directory');
    mockPromptForOptionSchemas.mockResolvedValueOnce({
      cancelled: false,
      prompted: {},
    });
    mockResolveLocalRepository.mockResolvedValueOnce({
      message: {
        level: 'message',
        text: remoteText,
      },
      remote: { owner: 'user', repository: 'repo' },
    });
    mockRunTemplate.mockResolvedValueOnce(new Error('Creation error.'));

    const actual = await runModeSetup({
      argv,
      display,
      from,
      rerunCommand,
      template,
    });

    expect(mockLog.message).toHaveBeenCalledWith(remoteText);
    expect(actual).toEqual({
      outro: cliMessages.leaving,
      status: cliStatuses.error,
    });
  });

  it('skips requests in runTemplate when skips.requests is true and there is a remote', async () => {
    mockPromptForDirectory.mockResolvedValueOnce('test-directory');
    mockPromptForOptionSchemas.mockResolvedValueOnce({
      cancelled: false,
      prompted: {},
    });
    mockResolveLocalRepository.mockResolvedValueOnce({
      remote: { owner: 'user', repository: 'repo' },
    });
    mockRunTemplate.mockResolvedValueOnce({ creation: {} });

    await runModeSetup({
      argv,
      display,
      from,
      rerunCommand,
      skips: { requests: true },
      template,
    });

    expect(mockRunTemplate).toHaveBeenCalledWith(
      template,
      expect.objectContaining({
        skips: {
          requests: true,
        },
      }),
    );
  });

  it('skips requests in runTemplate when skips.requests is false and there is no remote', async () => {
    mockPromptForDirectory.mockResolvedValueOnce('test-directory');
    mockPromptForOptionSchemas.mockResolvedValueOnce({
      cancelled: false,
      prompted: {},
    });
    mockResolveLocalRepository.mockResolvedValueOnce({});
    mockRunTemplate.mockResolvedValueOnce({ creation: {} });

    await runModeSetup({
      argv,
      display,
      from,
      rerunCommand,
      template,
    });

    expect(mockRunTemplate).toHaveBeenCalledWith(
      template,
      expect.objectContaining({
        skips: {
          requests: true,
        },
      }),
    );
  });

  it('suggests rerunning with --remote using the rerun command when there is no remote', async () => {
    mockPromptForDirectory.mockResolvedValueOnce('test-directory');
    mockPromptForOptionSchemas.mockResolvedValueOnce({
      cancelled: false,
      prompted: {},
    });
    mockResolveLocalRepository.mockResolvedValueOnce({});
    mockRunTemplate.mockResolvedValueOnce({ creation: {} });

    await runModeSetup({
      argv,
      display,
      from,
      rerunCommand,
      template,
    });

    expect(mockLog.info).toHaveBeenCalledWith(expect.stringContaining(`${rerunCommand} --remote`));
  });

  it('calls prepareGitRepository when the repository type is None', async () => {
    const remote = { owner: 'user', repository: 'repo' };
    mockPromptForDirectory.mockResolvedValueOnce('test-directory');
    mockPromptForOptionSchemas.mockResolvedValueOnce({
      cancelled: false,
      prompted: {},
    });
    mockResolveLocalRepository.mockResolvedValueOnce({
      remote,
      repositoryType: 'none',
    });
    mockRunTemplate.mockResolvedValueOnce({ creation: {} });

    await runModeSetup({
      argv,
      display,
      from,
      rerunCommand,
      template,
    });

    expect(mockPrepareGitRepository).toHaveBeenCalledWith(remote, mockSystem.runner);
  });

  it('skips calling prepareGitRepository when the repository type is Subdirectory', async () => {
    const remote = { owner: 'user', repository: 'repo' };
    mockPromptForDirectory.mockResolvedValueOnce('test-directory');
    mockPromptForOptionSchemas.mockResolvedValueOnce({
      cancelled: false,
      prompted: {},
    });
    mockResolveLocalRepository.mockResolvedValueOnce({
      remote,
      repositoryType: 'subdirectory',
    });
    mockRunTemplate.mockResolvedValueOnce({ creation: {} });

    await runModeSetup({
      argv,
      display,
      from,
      rerunCommand,
      template,
    });

    expect(mockPrepareGitRepository).not.toHaveBeenCalled();
  });

  it('reports the error when prepareGitRepository rejects', async () => {
    const preparationError = new Error('Preparation error.');

    mockPromptForDirectory.mockResolvedValueOnce('test-directory');
    mockPromptForOptionSchemas.mockResolvedValueOnce({
      cancelled: false,
      prompted: {},
    });
    mockResolveLocalRepository.mockResolvedValueOnce({
      remote: { owner: 'user', repository: 'repo' },
      repositoryType: 'none',
    });
    mockRunTemplate.mockResolvedValueOnce({ creation: {} });
    mockPrepareGitRepository.mockRejectedValueOnce(preparationError);

    const actual = await runModeSetup({
      argv,
      display,
      from,
      rerunCommand,
      template,
    });

    expect(actual).toEqual({
      outro: cliMessages.leaving,
      status: cliStatuses.error,
    });
  });

  it('logs a success outro and suggestions when everything succeeds', async () => {
    const suggestions = ['Suggestion.'];

    mockPromptForDirectory.mockResolvedValueOnce('test-directory');
    mockPromptForOptionSchemas.mockResolvedValueOnce({
      cancelled: false,
      prompted: {},
    });
    mockResolveLocalRepository.mockResolvedValueOnce({});
    mockRunTemplate.mockResolvedValueOnce({ creation: {}, suggestions });

    const actual = await runModeSetup({
      argv,
      display,
      from,
      rerunCommand,
      template,
    });

    expect(actual).toEqual({
      outro: `Thanks for using ${styleText(['bgGreenBright', 'black'], from)}! 💝`,
      status: cliStatuses.success,
      suggestions,
    });
  });
});
