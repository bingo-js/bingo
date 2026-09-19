import * as prompts from "@clack/prompts";
import path from "node:path";
import { styleText } from "node:util";

import { tryCatchError } from "../../utils/tryCatch.js";

export async function tryImport(from: string): Promise<Error | object> {
	const spinner = prompts.spinner();

	spinner.start(`Importing ${styleText("blue", from)}`);
	const imported = await tryCatchError(
		import(path.join(process.cwd(), from)) as Promise<object>,
	);

	if (imported instanceof Error) {
		spinner.stop(
			`Could not import ${styleText("blue", from)}. Does it exist?`,
			1,
		);
	} else {
		spinner.stop(`Imported ${styleText("blue", from)}.`);
	}

	return imported;
}
