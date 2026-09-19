import { parseArgs } from "node:util";

import { cliArgsOptions } from "./cliArgsOptions.js";

export interface RunCLIRawValues {
	directory?: boolean | string | undefined;
	help?: boolean | string | undefined;
	mode?: boolean | string | undefined;
	offline?: boolean | string | undefined;
	owner?: boolean | string | undefined;
	repository?: boolean | string | undefined;
	"skip-files"?: boolean | string | undefined;
	"skip-requests"?: boolean | string | undefined;
	"skip-scripts"?: boolean | string | undefined;
	version?: boolean | string | undefined;
}

export function parseProcessArgv() {
	return {
		argv: process.argv,
		...parseArgs({
			args: process.argv.slice(2),
			options: cliArgsOptions,
			strict: false,
		}),
	};
}
