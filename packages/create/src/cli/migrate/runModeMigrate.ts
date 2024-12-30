import * as prompts from "@clack/prompts";

import { produceBase } from "../../producers/produceBase.js";
import { runPreset } from "../../runners/runPreset.js";
import { createSystemContextWithAuth } from "../../system/createSystemContextWithAuth.js";
import { createClackDisplay } from "../display/createClackDisplay.js";
import { findPositionalFrom } from "../findPositionalFrom.js";
import { CLIStatus } from "../status.js";
import { ModeResults } from "../types.js";
import { loadMigrationPreset } from "./loadMigrationPreset.js";

export interface RunModeMigrateSettings {
	args: string[];
	configFile: string | undefined;
	directory?: string;
	from?: string;
	preset?: string | undefined;
}

export async function runModeMigrate({
	args,
	configFile,
	directory = ".",
	from = findPositionalFrom(args),
	preset: requestedPreset,
}: RunModeMigrateSettings): Promise<ModeResults> {
	const loaded = await loadMigrationPreset({
		configFile,
		from,
		requestedPreset,
	});
	if (loaded instanceof Error) {
		return {
			outro: loaded.message,
			status: CLIStatus.Error,
		};
	}
	if (prompts.isCancel(loaded)) {
		return { status: CLIStatus.Cancelled };
	}

	const description = `the ${loaded.preset.about.name} preset`;
	const display = createClackDisplay();
	const system = await createSystemContextWithAuth({ directory, display });

	display.spinner.start(`Running ${description}...`);

	const options = await produceBase(loaded.preset.base, {
		...system,
		directory,
	});

	await runPreset(loaded.preset, {
		...system,
		directory,
		mode: "migrate",
		options,
	});

	display.spinner.stop(`Ran ${description}.`);

	return {
		outro: `You might want to commit any changes.`,
		status: CLIStatus.Success,
	};
}
