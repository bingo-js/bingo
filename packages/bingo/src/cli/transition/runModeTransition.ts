import * as prompts from "@clack/prompts";
import { intakeDirectory } from "bingo-fs";

import { createSystemContextWithAuth } from "../../contexts/createSystemContextWithAuth.js";
import { prepareOptions } from "../../preparation/prepareOptions.js";
import { runTemplate } from "../../runners/runTemplate.js";
import { RequestedSkips } from "../../types/skips.js";
import { Template } from "../../types/templates.js";
import { ClackDisplay } from "../display/createClackDisplay.js";
import { runSpinnerTask } from "../display/runSpinnerTask.js";
import { logRerunSuggestion } from "../loggers/logRerunSuggestion.js";
import { logStartText } from "../loggers/logStartText.js";
import { CLIMessage } from "../messages.js";
import { parseZodArgs } from "../parsers/parseZodArgs.js";
import { promptForOptionSchemas } from "../prompts/promptForOptionSchemas.js";
import { clearLocalGitTags } from "../repository/clearLocalGitTags.js";
import { createInitialCommit } from "../repository/createInitialCommit.js";
import { resolveLocalRepository } from "../repository/resolveLocalRepository.js";
import { CLIStatus } from "../status.js";
import { ModeResults } from "../types.js";
import { clearTemplateFiles } from "./clearTemplateFiles.js";
import { getForkedRepositoryLocator } from "./getForkedRepositoryLocator.js";
import { readConfigSettings } from "./readConfigSettings.js";

export interface RunModeTransitionSettings {
	argv: string[];
	configFile: string | undefined;
	directory?: string;
	display: ClackDisplay;
	from: string;
	offline?: boolean;
	remote?: boolean;
	skips?: RequestedSkips;
	template: Template;
}

export async function runModeTransition({
	argv,
	configFile,
	directory = ".",
	display,
	from,
	offline = false,
	remote: requestedRemote,
	skips = {},
	template,
}: RunModeTransitionSettings): Promise<ModeResults> {
	logStartText("transition", offline);

	const system = await createSystemContextWithAuth({
		directory,
		display,
		offline,
	});

	const repositoryLocator =
		template.about?.repository &&
		(await getForkedRepositoryLocator(directory, template.about.repository));

	if (repositoryLocator) {
		await runSpinnerTask(
			display,
			`Clearing from ${repositoryLocator}`,
			`Cleared from ${repositoryLocator}`,
			async () => {
				await clearTemplateFiles(directory);
				await clearLocalGitTags(system.runner);
			},
		);
	}

	const providedOptions = parseZodArgs(argv, template.options);

	const loadedConfig = await readConfigSettings(
		configFile,
		directory,
		template,
	);
	if (loadedConfig instanceof Error) {
		logRerunSuggestion(argv, providedOptions);
		return { error: loadedConfig, status: CLIStatus.Error };
	}

	const preparedOptions =
		Object.keys(template.options).length &&
		(await runSpinnerTask(
			display,
			"Inferring options from existing repository",
			"Inferred options from existing repository",
			async () => {
				return await prepareOptions(template, {
					...system,
					existing: {
						...loadedConfig?.options,
						...providedOptions,
						directory,
					},
					offline,
				});
			},
		));
	if (preparedOptions instanceof Error) {
		logRerunSuggestion(argv, providedOptions);
		return { status: CLIStatus.Error };
	}

	const baseOptions = await promptForOptionSchemas(template, {
		existing: { ...providedOptions, ...preparedOptions },
		system,
	});
	if (baseOptions.cancelled) {
		logRerunSuggestion(argv, baseOptions.prompted);
		return { status: CLIStatus.Cancelled };
	}

	const { message, remote } = await resolveLocalRepository(
		display,
		{ repository: directory, ...baseOptions.completed },
		{ offline, remote: requestedRemote },
		system,
		template,
	);

	if (remote instanceof Error) {
		logRerunSuggestion(argv, baseOptions.prompted);
		return { error: remote, status: CLIStatus.Error };
	}

	if (message) {
		prompts.log[message.level](message.text);
	}

	const files = await intakeDirectory(directory, {
		exclude: /node_modules|^\.git$/,
	});

	const creation = await runSpinnerTask(
		display,
		`Running ${from}`,
		`Ran ${from}`,
		async () =>
			await runTemplate(template, {
				...system,
				directory,
				files,
				mode: "transition",
				offline,
				options: baseOptions.completed,
				refinements: loadedConfig?.refinements,
				skips: {
					...skips,
					requests: skips.requests ?? !remote,
				},
			}),
	);
	if (creation instanceof Error) {
		logRerunSuggestion(argv, baseOptions.prompted);
		return {
			outro: CLIMessage.Leaving,
			status: CLIStatus.Error,
		};
	}

	const commit =
		repositoryLocator || requestedRemote
			? await runSpinnerTask(
					display,
					"Creating initial commit",
					"Created initial commit",
					async () => {
						await createInitialCommit(system.runner, {
							amend: true,
							push: !offline,
						});
					},
				)
			: undefined;

	logRerunSuggestion(argv, baseOptions.prompted);

	return commit instanceof Error
		? {
				outro: CLIMessage.Leaving,
				status: CLIStatus.Error,
			}
		: {
				outro: repositoryLocator ? CLIMessage.New : CLIMessage.Done,
				status: CLIStatus.Success,
			};
}
