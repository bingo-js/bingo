import { styleText } from 'node:util';

import { afterEach, describe, expect, it, vi } from 'vitest';

import { createTemplate } from '../creators/createTemplate.ts';
import { createClackDisplay } from './display/createClackDisplay.ts';
import { runCli } from './runCli.ts';
import { cliStatuses } from './status.ts';

const mockLogHelpText = vi.fn();

vi.mock('./loggers/logHelpText.js', () => ({
  get logHelpText() {
    return mockLogHelpText;
  },
}));

const mockLogUnknownFlags = vi.fn();

vi.mock('./loggers/logUnknownFlags.js', () => ({
  get logUnknownFlags() {
    return mockLogUnknownFlags;
  },
}));

const mockLogOutro = vi.fn();

vi.mock('./loggers/logOutro.js', () => ({
  get logOutro() {
    return mockLogOutro;
  },
}));

const mockReadProductionSettings = vi.fn();

vi.mock('./readProductionSettings.js', () => ({
  get readProductionSettings() {
    return mockReadProductionSettings;
  },
}));

const mockRunModeSetup = vi.fn();

vi.mock('./setup/runModeSetup.js', () => ({
  get runModeSetup() {
    return mockRunModeSetup;
  },
}));

const mockRunModeTransition = vi.fn();

vi.mock('./transition/runModeTransition.js', () => ({
  get runModeTransition() {
    return mockRunModeTransition;
  },
}));

const template = createTemplate({
  produce: vi.fn(),
});

const argv = ['npx', 'bingo-example'];

describe(runCli, () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('logs unknown flags and errors when an unknown flag is provided', async () => {
    const actual = await runCli({
      argv,
      display: createClackDisplay(),
      from: '',
      template,
      values: { 'skip-file': true } as object,
    });

    expect(mockLogUnknownFlags).toHaveBeenCalledWith([
      { flag: 'skip-file', suggestion: 'skip-files' },
    ]);
    expect(actual).toEqual({ status: cliStatuses.error });
    expect(mockReadProductionSettings).not.toHaveBeenCalled();
  });

  it('logs the error when readProductionSettings resolves an error', async () => {
    const error = new Error('Oh no!');
    mockReadProductionSettings.mockResolvedValueOnce(error);

    const actual = await runCli({
      argv,
      display: createClackDisplay(),
      from: '',
      template,
      values: {},
    });

    expect(mockLogOutro).toHaveBeenCalledWith(styleText('red', error.message));
    expect(actual).toBe(cliStatuses.error);
  });

  it('runs logHelpText when help is specified', async () => {
    mockReadProductionSettings.mockResolvedValueOnce({
      mode: 'setup',
    });

    await runCli({
      argv,
      display: createClackDisplay(),
      from: '',
      template,
      values: {
        help: true,
      },
    });

    expect(mockLogHelpText).toHaveBeenCalledWith('setup', '', template);
    expect(mockRunModeSetup).not.toHaveBeenCalled();
    expect(mockRunModeTransition).not.toHaveBeenCalled();
  });

  it('runs runModeSetup when productionSettings.mode is setup', async () => {
    mockReadProductionSettings.mockResolvedValueOnce({
      mode: 'setup',
    });

    await runCli({
      argv,
      display: createClackDisplay(),
      from: '',
      template,
      values: {},
    });

    expect(mockLogOutro).not.toHaveBeenCalled();
    expect(mockRunModeSetup).toHaveBeenCalled();
    expect(mockRunModeTransition).not.toHaveBeenCalled();
  });

  it('runs runModeTransition when productionSettings.mode is transition', async () => {
    mockReadProductionSettings.mockResolvedValueOnce({
      mode: 'transition',
    });

    await runCli({
      argv,
      display: createClackDisplay(),
      from: '',
      template,
      values: {},
    });

    expect(mockLogOutro).not.toHaveBeenCalled();
    expect(mockRunModeSetup).not.toHaveBeenCalled();
    expect(mockRunModeTransition).toHaveBeenCalled();
  });

  it('provides skips.files when --skip-files is provided', async () => {
    mockReadProductionSettings.mockResolvedValueOnce({
      mode: 'setup',
    });

    await runCli({
      argv,
      display: createClackDisplay(),
      from: '',
      template,
      values: {
        'skip-files': true,
      },
    });

    expect(mockRunModeSetup).toHaveBeenCalledWith(
      expect.objectContaining({
        skips: {
          files: true,
        },
      }),
    );
  });

  it('provides skips.requests when --skip-requests is provided', async () => {
    mockReadProductionSettings.mockResolvedValueOnce({
      mode: 'setup',
    });

    await runCli({
      argv,
      display: createClackDisplay(),
      from: '',
      template,
      values: {
        'skip-requests': true,
      },
    });

    expect(mockRunModeSetup).toHaveBeenCalledWith(
      expect.objectContaining({
        skips: {
          requests: true,
        },
      }),
    );
  });

  it('provides skips.scripts when --skip-scripts is provided', async () => {
    mockReadProductionSettings.mockResolvedValueOnce({
      mode: 'setup',
    });

    await runCli({
      argv,
      display: createClackDisplay(),
      from: '',
      template,
      values: {
        'skip-scripts': true,
      },
    });

    expect(mockRunModeSetup).toHaveBeenCalledWith(
      expect.objectContaining({
        skips: {
          scripts: true,
        },
      }),
    );
  });
  it('provides a rerun command based on from when rerunFrom is not provided', async () => {
    vi.stubEnv('npm_config_user_agent', '');
    mockReadProductionSettings.mockResolvedValueOnce({
      mode: 'setup',
    });

    await runCli({
      argv,
      display: createClackDisplay(),
      from: 'create-example',
      template,
      values: {},
    });

    expect(mockRunModeSetup).toHaveBeenCalledWith(
      expect.objectContaining({
        rerunCommand: 'npx create-example',
      }),
    );
  });

  it('provides a rerun command based on rerunFrom when it is provided', async () => {
    vi.stubEnv('npm_config_user_agent', '');
    mockReadProductionSettings.mockResolvedValueOnce({
      mode: 'setup',
    });

    await runCli({
      argv,
      display: createClackDisplay(),
      from: 'bingo',
      rerunFrom: 'bingo /path/to/template.js',
      template,
      values: {},
    });

    expect(mockRunModeSetup).toHaveBeenCalledWith(
      expect.objectContaining({
        rerunCommand: 'npx bingo /path/to/template.js',
      }),
    );
  });

  it('rejects --repo-visibility unless --remote is also provided', async () => {
    mockReadProductionSettings.mockClear();

    const actual = await runCli({
      argv,
      display: createClackDisplay(),
      from: '',
      template,
      values: { 'repo-visibility': 'private' },
    });

    expect(mockLogOutro).toHaveBeenCalledWith(
      styleText('red', '--repo-visibility can only be used alongside --remote.'),
    );
    expect(mockReadProductionSettings).not.toHaveBeenCalled();
    expect(actual).toBe(cliStatuses.error);
  });

  it('passes --repo-visibility through to remote repository setup', async () => {
    mockReadProductionSettings.mockResolvedValueOnce({ mode: 'setup' });

    await runCli({
      argv,
      display: createClackDisplay(),
      from: '',
      template,
      values: { remote: true, 'repo-visibility': 'private' },
    });

    expect(mockRunModeSetup).toHaveBeenCalledWith(
      expect.objectContaining({ repoVisibility: 'private' }),
    );
  });

});
