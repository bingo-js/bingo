import { beforeEach, describe, expect, it, vi } from 'vitest';

import { runBingoCLI } from './runBingoCLI.ts';
import { cliStatuses } from './status.ts';

const mockLog = {
  error: vi.fn(),
};

vi.mock('@clack/prompts', () => ({
  get log() {
    return mockLog;
  },
}));

vi.mock('../packageData.js', () => ({
  packageData: {
    name: 'bingo',
    version: '1.2.3',
  },
}));

const mockLogHelpOptions = vi.fn();

vi.mock('./loggers/logHelpOptions.js', () => ({
  get logHelpOptions() {
    return mockLogHelpOptions;
  },
}));

const mockParseProcessArgv = vi.fn();

vi.mock('./parseProcessArgv.js', () => ({
  get parseProcessArgv() {
    return mockParseProcessArgv;
  },
}));

const mockRunCLI = vi.fn();

vi.mock('./runCLI.js', () => ({
  get runCLI() {
    return mockRunCLI;
  },
}));

const mockTryImportTemplate = vi.fn();

vi.mock('./importers/tryImportTemplate.js', () => ({
  get tryImportTemplate() {
    return mockTryImportTemplate;
  },
}));

vi.mock('./display/runInsideClackDisplay.js', () => ({
  runInsideClackDisplay: (_data: unknown, callback: (display: object) => unknown) => callback({}),
}));

const mockConsole = {
  error: vi.fn(),
  log: vi.fn(),
};

describe(runBingoCLI, () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(mockConsole.error);
    vi.spyOn(console, 'log').mockImplementation(mockConsole.log);
  });

  it('prints the version when --version is provided', async () => {
    mockParseProcessArgv.mockReturnValueOnce({
      args: ['--version'],
      positionals: [],
      values: { version: true },
    });

    const actual = await runBingoCLI();

    expect(mockConsole.log).toHaveBeenCalledWith('1.2.3');
    expect(actual).toBe(cliStatuses.success);
  });

  it('logs an error when no template path is provided', async () => {
    mockParseProcessArgv.mockReturnValueOnce({ args: [], positionals: [], values: {} });

    const actual = await runBingoCLI();

    expect(mockLog.error).toHaveBeenCalledWith('bingo requires a path to local template file.');
    expect(actual).toBe(cliStatuses.error);
  });

  it('logs the error when the template cannot be imported', async () => {
    const error = new Error('Oh no!');
    mockParseProcessArgv.mockReturnValueOnce({
      args: ['template.js'],
      positionals: ['template.js'],
      values: {},
    });
    mockTryImportTemplate.mockResolvedValueOnce(error);

    const actual = await runBingoCLI();

    expect(mockConsole.error).toHaveBeenCalledWith(error);
    expect(actual).toBe(cliStatuses.error);
  });

  it('runs the CLI with the args and the template', async () => {
    const template = {};
    mockParseProcessArgv.mockReturnValueOnce({
      args: ['template.js', '--title', 'abc'],
      positionals: ['template.js'],
      values: {},
    });
    mockTryImportTemplate.mockResolvedValueOnce(template);
    mockRunCLI.mockResolvedValueOnce({ status: cliStatuses.success });

    const actual = await runBingoCLI();

    expect(mockRunCLI).toHaveBeenCalledWith(
      expect.objectContaining({
        args: ['template.js', '--title', 'abc'],
        from: 'bingo',
        template,
      }),
    );
    expect(mockLogHelpOptions).not.toHaveBeenCalled();
    expect(actual).toEqual({ status: cliStatuses.success });
  });

  it('logs the template path option when --help is provided', async () => {
    mockParseProcessArgv.mockReturnValueOnce({
      args: ['template.js', '--help'],
      positionals: ['template.js'],
      values: { help: true },
    });
    mockTryImportTemplate.mockResolvedValueOnce({});
    mockRunCLI.mockResolvedValueOnce({ status: cliStatuses.success });

    await runBingoCLI();

    expect(mockLogHelpOptions).toHaveBeenCalled();
  });
});
