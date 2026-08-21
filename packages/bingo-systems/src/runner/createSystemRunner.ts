import { execa, parseCommandString } from "execa";

import { getColorsEnv } from "./getColorsEnv.js";
import { SystemRunner } from "./runner.js";

export function createSystemRunner(directory = "."): SystemRunner {
	const executor = execa({
		cwd: directory,
		env: getColorsEnv(),
		reject: false,
	});

	return (command: string) => executor`${parseCommandString(command)}`;
}
