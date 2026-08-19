import { ExecaError, Result } from "execa";

/**
 * Optional settings for executing a command.
 */
export interface SystemRunnerOptions {
	/**
	 * Whether to ask the command to print colors, if the terminal supports them.
	 */
	colors?: boolean;
}

/**
 * Executes a command in the system shell.
 * @see {@link https://github.com/sindresorhus/execa}
 */
export type SystemRunner = (
	command: string,
	options?: SystemRunnerOptions,
) => Promise<ExecaError | Result>;
