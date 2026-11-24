import type { ExecaError, Result } from 'execa';

export type SystemRunnerResult = ExecaError | Result;

/**
 * Executes a command in the system shell.
 * @see {@link https://github.com/sindresorhus/execa}
 */
export type SystemRunner = (command: string) => Promise<SystemRunnerResult>;
