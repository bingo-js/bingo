import * as prompts from "@clack/prompts";
import chalk from "chalk";

import { UnknownFlag } from "../parsers/getUnknownFlags.js";

export function logUnknownFlags(unknownFlags: UnknownFlag[]) {
	prompts.log.error(
		unknownFlags
			.map(({ flag, suggestion }) =>
				[
					`Unknown CLI flag: ${chalk.red(`--${flag}`)}`,
					...(suggestion
						? [`  Did you mean ${chalk.green(`--${suggestion}`)}?`]
						: []),
				].join("\n"),
			)
			.join("\n"),
	);
}
