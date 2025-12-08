import chalk from "chalk";
import { z } from "zod";

import { Template } from "../types/templates.js";
import { ClackDisplay } from "./display/createClackDisplay.js";
import { logHelpText } from "./loggers/logHelpText.js";
import { logOutro } from "./loggers/logOutro.js";
import { RunCLIRawValues } from "./parseProcessArgv.js";
import { readProductionSettings } from "./readProductionSettings.js";
import { runModeSetup } from "./setup/runModeSetup.js";
import { CLIStatus } from "./status.js";
import { runModeTransition } from "./transition/runModeTransition.js";

const valuesSchema = z.object({
	directory: z.string().optional(),
	help: z.boolean().optional(),
	mode: z.union([z.literal("setup"), z.literal("transition")]).optional(),
	offline: z.boolean().optional(),
	owner: z.string().optional(),
	remote: z.boolean().optional(),
	repository: z.string().optional(),
	"skip-files": z.boolean().optional(),
	"skip-requests": z.boolean().optional(),
	"skip-scripts": z.boolean().optional(),
});

export interface RunCLISettings {
	argv: string[];
	display: ClackDisplay;
	from: string;
	template: Template;
	values: RunCLIRawValues;
}

export async function runCLI({
	argv,
	display,
	from,
	template,
	values,
}: RunCLISettings) {
	const validatedValues = valuesSchema.parse(values);
	const productionSettings = await readProductionSettings({
		from,
		...validatedValues,
	});
	if (productionSettings instanceof Error) {
		logOutro(chalk.red(productionSettings.message));
		return CLIStatus.Error;
	}
	if (validatedValues.help) {
		return logHelpText(productionSettings.mode, from, template);
	}

	const sharedSettings = {
		...validatedValues,
		argv,
		display,
		from,
		remote: validatedValues.remote,
		skips: {
			files: validatedValues["skip-files"],
			requests: validatedValues["skip-requests"],
			scripts: validatedValues["skip-scripts"],
		},
		template,
	};

	return productionSettings.mode === "setup"
		? await runModeSetup(sharedSettings)
		: await runModeTransition({
				...sharedSettings,
				configFile: productionSettings.configFile,
			});
}
