import * as prompts from "@clack/prompts";
import { styleText } from "node:util";

import { UnknownFlag } from "../parsers/getUnknownFlags.js";

export function logUnknownFlags(unknownFlags: UnknownFlag[]) {
	prompts.log.error(
		unknownFlags
			.map(({ flag, suggestion }) =>
				[
					`Unknown CLI flag: ${styleText("red", formatFlagAsWritten(flag))}`,
					...(suggestion
						? [`  Did you mean ${styleText("green", `--${suggestion}`)}?`]
						: []),
				].join("\n"),
			)
			.join("\n"),
	);
}

function formatFlagAsWritten(flag: string) {
	return flag.length === 1 ? `-${flag}` : `--${flag}`;
}
