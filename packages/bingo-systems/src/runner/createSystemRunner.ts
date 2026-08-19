import { execa, parseCommandString } from "execa";

import { getColorsEnv } from "./getColorsEnv.js";
import { SystemRunner, SystemRunnerOptions } from "./runner.js";

export function createSystemRunner(directory = "."): SystemRunner {
	return (command: string, options?: SystemRunnerOptions) => {
		const executor = execa({
			cwd: directory,
			env: options?.colors ? getColorsEnv() : undefined,
			reject: false,
		});

		return executor`${parseCommandString(command)}`;
	};
}
