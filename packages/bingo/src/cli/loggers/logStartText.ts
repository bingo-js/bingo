import * as prompts from "@clack/prompts";
import { styleText } from "node:util";

import { ProductionMode } from "../../types/modes.js";

export function logStartText(
	mode: ProductionMode,
	offline: boolean | undefined,
) {
	prompts.log.step(`Running with mode --${mode}`);

	if (offline) {
		prompts.log.message(
			`${styleText("blue", "--offline")} enabled. You'll need to git push any changes manually.`,
		);
	}
}
