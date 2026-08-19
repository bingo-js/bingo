import * as prompts from "@clack/prompts";
import { styleText } from "node:util";

import { tryCatchError } from "../../utils/tryCatch.js";
import { ClackDisplay } from "./createClackDisplay.js";

export async function runSpinnerTask<T>(
	display: ClackDisplay,
	start: string,
	stop: string,
	task: () => Promise<T>,
) {
	display.spinner.start(`${start}...`);

	const result = await tryCatchError(task());

	if (result instanceof Error) {
		display.spinner.stop(
			`Error ${start[0].toLowerCase()}${start.slice(1)}:`,
			1,
		);
		prompts.log.error(styleText("red", result.stack ?? result.message));
	} else {
		display.spinner.stop(stop);
	}

	return result;
}
