import { styleText } from 'node:util';

import { afterEach, describe, expect, it, vi } from 'vitest';
import { z } from 'zod';

import { createTemplate } from '../creators/createTemplate.ts';
import { createClackDisplay } from './display/createClackDisplay.ts';
import { runCLI } from './runCLI.ts';
import { cliStatuses } from './status.ts';

const mockLogHelpText = vi.fn();

vi.mock('./loggers/logHelpText.js', () => ({
  get logHelpText() {
    return mockLogHelpText;
  },
}));

const mockLogInvalidFlags = vi.fn();

vi.mock('./loggers/logInvalidFlags.ts', () => ({
  get logInvalidFlags() {
    return mockLogInvalidFlags;
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

describe('runCli', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('logs unknown flags and errors when an unknown flag is provided', async () => {
    const actual = await runCLI({
      args: ['--skip-file'],
      display: createClackDisplay(),
      from: '',
      template,
    });

    expect(mockLogInvalidFlags).toHaveBeenCalledWith([
      {
        flag: 'skip-file',
        kind: 'unknown',
        message: 'Unknown flag: --skip-file',
        suggestion: 'skip-files',
      },
    ]);
    expect(actual).toEqual({ status: cliStatuses.error });
    expect(mockReadProductionSettings).not.toHaveBeenCalled();
  });

  it('logs unknown flags and invalid flags together when both are provided', async () => {
    const actual = await runCLI({
      args: ['--skip-file', '--count', 'abc'],
      display: createClackDisplay(),
      from: '',
      template: createTemplate({
        options: { count: z.number() as unknown },
        produce: vi.fn(),
      }),
    });

    expect(mockLogInvalidFlags).toHaveBeenCalledWith([
      {
        flag: 'skip-file',
        kind: 'unknown',
        message: 'Unknown flag: --skip-file',
        suggestion: 'skip-files',
      },
      {
        flag: 'count',
        kind: 'invalid',
        message: '--count: Expected a number, received "abc".',
      },
    ]);
    expect(actual).toEqual({ status: cliStatuses.error });
    expect(mockLogHelpText).not.toHaveBeenCalled();
  });

  it('parses without logging when only known CLI flags and template options are provided', async () => {
    mockReadProductionSettings.mockResolvedValueOnce({
      mode: 'setup',
    });

    await runCLI({
      args: ['--offline', '--mode', 'setup', '--no-value', '--title=abc'],
      display: createClackDisplay(),
      from: '',
      template: createTemplate({
        options: {
          title: z.string() as unknown,
          value: z.boolean().default(true) as unknown,
        },
        produce: vi.fn(),
      }),
    });

    expect(mockLogInvalidFlags).not.toHaveBeenCalled();
    expect(mockRunModeSetup).toHaveBeenCalledWith(
      expect.objectContaining({
        providedValues: { mode: 'setup', offline: true, title: 'abc', value: false },
      }),
    );
  });

  it("logs invalid flags and errors when a template option's value can't be converted", async () => {
    mockReadProductionSettings.mockResolvedValueOnce({
      mode: 'setup',
    });

    const actual = await runCLI({
      args: ['--count', 'abc'],
      display: createClackDisplay(),
      from: '',
      template: createTemplate({
        options: { count: z.number() as unknown },
        produce: vi.fn(),
      }),
    });

    expect(mockLogInvalidFlags).toHaveBeenCalledWith([
      {
        flag: 'count',
        kind: 'invalid',
        message: '--count: Expected a number, received "abc".',
      },
    ]);
    expect(actual).toEqual({ status: cliStatuses.error });
    expect(mockRunModeSetup).not.toHaveBeenCalled();
    expect(mockRunModeTransition).not.toHaveBeenCalled();
  });

  it('runs logHelpText instead of logging invalid flags when help is specified', async () => {
    mockReadProductionSettings.mockResolvedValueOnce({
      mode: 'setup',
    });
    const template = createTemplate({
      options: { count: z.number() as unknown },
      produce: vi.fn(),
    });

    await runCLI({
      args: ['--help', '--count'],
      display: createClackDisplay(),
      from: '',
      template,
    });

    expect(mockLogInvalidFlags).not.toHaveBeenCalled();
    expect(mockLogHelpText).toHaveBeenCalledWith('setup', '', template);
    expect(mockRunModeSetup).not.toHaveBeenCalled();
  });

  it('logs the error when readProductionSettings resolves an error', async () => {
    const error = new Error('Oh no!');
    mockReadProductionSettings.mockResolvedValueOnce(error);

    const actual = await runCLI({
      args: ['--skip-files'],
      display: createClackDisplay(),
      from: '',
      template,
    });

    expect(mockLogOutro).toHaveBeenCalledWith(styleText('red', error.message));
    expect(actual).toBe(cliStatuses.error);
  });

  it('logs invalid flags when --mode is not a known mode', async () => {
    const actual = await runCLI({
      args: ['--mode', 'bogus'],
      display: createClackDisplay(),
      from: '',
      template,
    });

    expect(mockLogInvalidFlags).toHaveBeenCalledWith([
      expect.objectContaining({ flag: 'mode', kind: 'invalid' }),
    ]);
    expect(actual).toEqual({ status: cliStatuses.error });
  });

  it('keeps CLI flags that templates have options of the same name for', async () => {
    mockReadProductionSettings.mockResolvedValueOnce({ mode: 'setup' });

    const actual = await runCLI({
      args: ['--mode', 'transition', '--owner', 'abc'],
      display: createClackDisplay(),
      from: '',
      template: createTemplate({
        options: { mode: z.number() as unknown, owner: z.string() as unknown },
        produce: vi.fn(),
      }),
    });

    expect(mockLogInvalidFlags).not.toHaveBeenCalled();
    expect(actual).not.toEqual({ status: cliStatuses.error });
    expect(mockRunModeSetup).toHaveBeenCalledWith(
      expect.objectContaining({
        providedValues: { mode: 'transition', owner: 'abc' },
      }),
    );
  });

  it('keeps string CLI flags when a template option of the same name is not a string', async () => {
    mockReadProductionSettings.mockResolvedValueOnce({ mode: 'setup' });

    await runCLI({
      args: ['--owner', '5', '--title', 'x'],
      display: createClackDisplay(),
      from: '',
      template: createTemplate({
        options: { owner: z.number().optional() as unknown, title: z.string() as unknown },
        produce: vi.fn(),
      }),
    });

    expect(mockLogInvalidFlags).not.toHaveBeenCalled();
    expect(mockRunModeSetup).toHaveBeenCalledWith(
      expect.objectContaining({
        providedValues: { owner: '5', title: 'x' },
      }),
    );
  });

  it('runs logHelpText when help is specified', async () => {
    mockReadProductionSettings.mockResolvedValueOnce({
      mode: 'setup',
    });

    await runCLI({
      args: ['--help'],
      display: createClackDisplay(),
      from: '',
      template,
    });

    expect(mockLogHelpText).toHaveBeenCalledWith('setup', '', template);
    expect(mockRunModeSetup).not.toHaveBeenCalled();
    expect(mockRunModeTransition).not.toHaveBeenCalled();
  });

  it('runs runModeSetup when productionSettings.mode is setup', async () => {
    mockReadProductionSettings.mockResolvedValueOnce({
      mode: 'setup',
    });

    await runCLI({
      args: [],
      display: createClackDisplay(),
      from: '',
      template,
    });

    expect(mockLogOutro).not.toHaveBeenCalled();
    expect(mockRunModeSetup).toHaveBeenCalled();
    expect(mockRunModeTransition).not.toHaveBeenCalled();
  });

  it('runs runModeTransition when productionSettings.mode is transition', async () => {
    mockReadProductionSettings.mockResolvedValueOnce({
      mode: 'transition',
    });

    await runCLI({
      args: [],
      display: createClackDisplay(),
      from: '',
      template,
    });

    expect(mockLogOutro).not.toHaveBeenCalled();
    expect(mockRunModeSetup).not.toHaveBeenCalled();
    expect(mockRunModeTransition).toHaveBeenCalled();
  });

  it('provides skips.files when --skip-files is provided', async () => {
    mockReadProductionSettings.mockResolvedValueOnce({
      mode: 'setup',
    });

    await runCLI({
      args: ['--skip-files'],
      display: createClackDisplay(),
      from: '',
      template,
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

    await runCLI({
      args: ['--skip-requests'],
      display: createClackDisplay(),
      from: '',
      template,
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

    await runCLI({
      args: ['--skip-scripts'],
      display: createClackDisplay(),
      from: '',
      template,
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

    await runCLI({
      args: [],
      display: createClackDisplay(),
      from: 'create-example',
      template,
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

    await runCLI({
      args: [],
      display: createClackDisplay(),
      from: 'bingo',
      rerunFrom: 'bingo /path/to/template.js',
      template,
    });

    expect(mockRunModeSetup).toHaveBeenCalledWith(
      expect.objectContaining({
        rerunCommand: 'npx bingo /path/to/template.js',
      }),
    );
  });
});
