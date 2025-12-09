import * as prompts from "@clack/prompts";
import chalk from "chalk";
import { z } from "zod";

import { createSystemContextWithAuth } from "../../contexts/createSystemContextWithAuth.js";
import { prepareOptions } from "../../preparation/prepareOptions.js";
import { runTemplate } from "../../runners/runTemplate.js";
import { RequestedSkips } from "../../types/skips.js";
import { Template } from "../../types/templates.js";
import { ClackDisplay } from "../display/createClackDisplay.js";
import { runSpinnerTask } from "../display/runSpinnerTask.js";
import { GitRepositoryType } from "../getGitRepositoryType.js";
import { getRerunCommand } from "../loggers/getRerunCommand.js";
import { logRerunSuggestion } from "../loggers/logRerunSuggestion.js";
import { logStartText } from "../loggers/logStartText.js";
import { CLIMessage } from "../messages.js";
import { parseZodArgs } from "../parsers/parseZodArgs.js";
import { promptForDirectory } from "../prompts/promptForDirectory.js";
import { promptForOptionSchemas } from "../prompts/promptForOptionSchemas.js";
import { prepareGitRepository } from "../repository/prepareGitRepository.js";
import { resolveLocalRepository } from "../repository/resolveLocalRepository.js";
import { CLIStatus } from "../status.js";
import { ModeResults } from "../types.js";
import { makeRelative } from "../utils.js";

export interface RunModeSetupSettings {
	argv: string[];
	directory?: string;
	display: ClackDisplay;
	from: string;
	offline?: boolean;
	remote?: boolean;
	repository?: string;
	skips?: RequestedSkips;
	template: Template;
}

export async function runModeSetup({
	argv,
	repository: requestedRepository,
	directory: requestedDirectory = requestedRepository,
	display,
	from,
	offline = false,
	remote: requestedRemote,
	skips = {},
	template,
}: RunModeSetupSettings): Promise<ModeResults> {
	logStartText("setup", offline);

	const directory = await promptForDirectory({
		requestedDirectory,
		requestedRepository,
		template,
	});
	if (prompts.isCancel(directory)) {
		return { status: CLIStatus.Cancelled };
	}

	const system = await createSystemContextWithAuth({
		directory,
		display,
		offline,
	});

	const providedOptions = parseZodArgs(argv, {
		directory: z.string().optional(),
		owner: z.string().optional(),
		repository: z.string().optional(),
		...template.options,
	});

	const preparedOptions = await runSpinnerTask(
		display,
		"Inferring default options from system",
		"Inferred default options from system",
		async () => {
			return await prepareOptions(template, {
				...system,
				existing: { ...providedOptions, directory },
				offline,
			});
		},
	);
	if (preparedOptions instanceof Error) {
		logRerunSuggestion(argv, providedOptions);
		return { status: CLIStatus.Error };
	}

	const repository = requestedRepository ?? directory;
	const baseOptions = await promptForOptionSchemas(template, {
		existing: {
			directory,
			repository,
			...providedOptions,
			...preparedOptions,
		},
		system,
	});
	if (baseOptions.cancelled) {
		logRerunSuggestion(argv, baseOptions.prompted);
		return { status: CLIStatus.Cancelled };
	}

	const { message, remote, repositoryType } = await resolveLocalRepository(
		display,
		{ repository, ...baseOptions.completed },
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

	const descriptor = template.about?.name ?? from;

	const creation = await runSpinnerTask(
		display,
		`Running the ${descriptor} template`,
		`Ran the ${descriptor} template`,
		async () =>
			await runTemplate(template, {
				...system,
				directory,
				mode: "setup",
				offline,
				options: baseOptions.completed,
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

	const preparationError =
		repositoryType !== GitRepositoryType.Subdirectory &&
		(await runSpinnerTask(
			display,
			"Preparing local Git repository",
			"Prepared local Git repository",
			async () => {
				await prepareGitRepository(remote, system.runner);
			},
		));

	if (!remote && repositoryType !== GitRepositoryType.Subdirectory) {
		prompts.log.info(
			[
				`Run ${chalk.blue(`${getRerunCommand(argv)} --remote`)} in ${chalk.green(makeRelative(directory))}`,
				`to create and sync a remote repository on GitHub.`,
			].join("\n"),
		);
	}

	logRerunSuggestion(argv, baseOptions.prompted);

	if (preparationError) {
		return {
			outro: CLIMessage.Leaving,
			status: CLIStatus.Error,
		};
	}

	return {
		outro: `Thanks for using ${chalk.bgGreenBright.black(from)}! 💝`,
		status: CLIStatus.Success,
		suggestions: creation.suggestions,
	};
}
