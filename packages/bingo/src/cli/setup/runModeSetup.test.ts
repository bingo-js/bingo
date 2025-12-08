import chalk from "chalk";
import { describe, expect, it, vi } from "vitest";
import { z } from "zod";

import { createTemplate } from "../../creators/createTemplate.js";
import { ClackDisplay } from "../display/createClackDisplay.js";
import { GitRepositoryType } from "../getGitRepositoryType.js";
import { CLIMessage } from "../messages.js";
import { CLIStatus } from "../status.js";
import { runModeSetup } from "./runModeSetup.js";

const mockCancel = Symbol("cancel");

const mockLog = {
	error: vi.fn(),
	info: vi.fn(),
	message: vi.fn(),
	warn: vi.fn(),
};

vi.mock("@clack/prompts", () => ({
	isCancel: (value: unknown) => value === mockCancel,
	get log() {
		return mockLog;
	},
}));

const mockSystem = {
	fetchers: {
		octokit: {},
	},
	runner: vi.fn(),
};

vi.mock("../../contexts/createSystemContextWithAuth.js", () => ({
	get createSystemContextWithAuth() {
		return vi.fn().mockResolvedValue(mockSystem);
	},
}));

vi.mock("../loggers/logRerunSuggestion.js");

const mockLogStartText = vi.fn();

vi.mock("../loggers/logStartText", () => ({
	get logStartText() {
		return mockLogStartText;
	},
}));

const mockPrepareOptions = vi.fn();

vi.mock("../../preparation/prepareOptions.js", () => ({
	get prepareOptions() {
		return mockPrepareOptions;
	},
}));

const mockPrepareGitRepository = vi.fn();

vi.mock("../repository/prepareGitRepository.js", () => ({
	get prepareGitRepository() {
		return mockPrepareGitRepository;
	},
}));

const mockResolveLocalRepository = vi.fn();

vi.mock("../repository/resolveLocalRepository.js", () => ({
	get resolveLocalRepository() {
		return mockResolveLocalRepository;
	},
}));

const mockPromptForDirectory = vi.fn();

vi.mock("../prompts/promptForDirectory.js", () => ({
	get promptForDirectory() {
		return mockPromptForDirectory;
	},
}));

const mockPromptForOptionSchemas = vi.fn();

vi.mock("../prompts/promptForOptionSchemas.js", () => ({
	get promptForOptionSchemas() {
		return mockPromptForOptionSchemas;
	},
}));

const mockRunTemplate = vi.fn();

vi.mock("../../runners/runTemplate.js", () => ({
	get runTemplate() {
		return mockRunTemplate;
	},
}));

const argv = ["npx", "bingo-my-app"];

const from = "create-example";

const display: ClackDisplay = {
	dumpItems: vi.fn(),
	item: vi.fn(),
	log: vi.fn(),
	spinner: {
		message: vi.fn(),
		start: vi.fn(),
		stop: vi.fn(),
	},
};

const template = createTemplate({
	about: { name: "Test Template" },
	options: {
		value: z.string().optional(),
	},
	produce: vi.fn(),
});

describe("runModeSetup", () => {
	it("returns a cancellation status when the directory prompt is cancelled", async () => {
		mockPromptForDirectory.mockResolvedValueOnce(mockCancel);

		const actual = await runModeSetup({
			argv,
			display,
			from,
			template,
		});

		expect(actual).toEqual({
			status: CLIStatus.Cancelled,
		});
	});

	it("returns an error status when preparing options results in an error", async () => {
		mockPromptForDirectory.mockResolvedValueOnce("test-directory");
		mockPrepareOptions.mockResolvedValueOnce(new Error("Oh no!"));

		const actual = await runModeSetup({
			argv,
			display,
			from,
			template,
		});

		expect(actual).toEqual({
			status: CLIStatus.Error,
		});
	});

	it("returns a cancellation status when prompting for options is cancelled", async () => {
		mockPromptForDirectory.mockResolvedValueOnce("test-directory");
		mockPromptForOptionSchemas.mockResolvedValueOnce({
			cancelled: true,
			prompted: {},
		});

		const actual = await runModeSetup({
			argv,
			display,
			from,
			template,
		});

		expect(actual).toEqual({
			status: CLIStatus.Cancelled,
		});
	});

	it("returns the error when resolving a remote repository results in an error", async () => {
		const remote = new Error("Remote error.");

		mockPromptForDirectory.mockResolvedValueOnce("test-directory");
		mockPromptForOptionSchemas.mockResolvedValueOnce({
			cancelled: false,
			prompted: {},
		});
		mockResolveLocalRepository.mockResolvedValueOnce({ remote });

		const actual = await runModeSetup({
			argv,
			display,
			from,
			template,
		});

		expect(actual).toEqual({
			error: remote,
			status: CLIStatus.Error,
		});
	});

	it("returns the error when creating a remote repository results in an error", async () => {
		const remoteText = "To create remote.";

		mockPromptForDirectory.mockResolvedValueOnce("test-directory");
		mockPromptForOptionSchemas.mockResolvedValueOnce({
			cancelled: false,
			prompted: {},
		});
		mockResolveLocalRepository.mockResolvedValueOnce({
			message: {
				level: "message",
				text: remoteText,
			},
			remote: { owner: "user", repository: "repo" },
		});
		mockRunTemplate.mockResolvedValueOnce(new Error("Creation error."));

		const actual = await runModeSetup({
			argv,
			display,
			from,
			template,
		});

		expect(mockLog.message).toHaveBeenCalledWith(remoteText);
		expect(actual).toEqual({
			outro: CLIMessage.Leaving,
			status: CLIStatus.Error,
		});
	});

	it("skips requests in runTemplate when skips.requests is true and there is a remote", async () => {
		mockPromptForDirectory.mockResolvedValueOnce("test-directory");
		mockPromptForOptionSchemas.mockResolvedValueOnce({
			cancelled: false,
			prompted: {},
		});
		mockResolveLocalRepository.mockResolvedValueOnce({
			remote: { owner: "user", repository: "repo" },
		});
		mockRunTemplate.mockResolvedValueOnce({ creation: {} });

		await runModeSetup({
			argv,
			display,
			from,
			skips: { requests: true },
			template,
		});

		expect(mockRunTemplate).toHaveBeenCalledWith(
			template,
			expect.objectContaining({
				skips: {
					requests: true,
				},
			}),
		);
	});

	it("skips requests in runTemplate when skips.requests is false and there is no remote", async () => {
		mockPromptForDirectory.mockResolvedValueOnce("test-directory");
		mockPromptForOptionSchemas.mockResolvedValueOnce({
			cancelled: false,
			prompted: {},
		});
		mockResolveLocalRepository.mockResolvedValueOnce({});
		mockRunTemplate.mockResolvedValueOnce({ creation: {} });

		await runModeSetup({
			argv,
			display,
			from,
			template,
		});

		expect(mockRunTemplate).toHaveBeenCalledWith(
			template,
			expect.objectContaining({
				skips: {
					requests: true,
				},
			}),
		);
	});

	it("calls prepareGitRepository when the repository type is None", async () => {
		const remote = { owner: "user", repository: "repo" };
		mockPromptForDirectory.mockResolvedValueOnce("test-directory");
		mockPromptForOptionSchemas.mockResolvedValueOnce({
			cancelled: false,
			prompted: {},
		});
		mockResolveLocalRepository.mockResolvedValueOnce({
			remote,
			repositoryType: GitRepositoryType.None,
		});
		mockRunTemplate.mockResolvedValueOnce({ creation: {} });

		await runModeSetup({
			argv,
			display,
			from,
			template,
		});

		expect(mockPrepareGitRepository).toHaveBeenCalledWith(
			remote,
			mockSystem.runner,
		);
	});

	it("skips calling prepareGitRepository when the repository type is Subdirectory", async () => {
		const remote = { owner: "user", repository: "repo" };
		mockPromptForDirectory.mockResolvedValueOnce("test-directory");
		mockPromptForOptionSchemas.mockResolvedValueOnce({
			cancelled: false,
			prompted: {},
		});
		mockResolveLocalRepository.mockResolvedValueOnce({
			remote,
			repositoryType: GitRepositoryType.Subdirectory,
		});
		mockRunTemplate.mockResolvedValueOnce({ creation: {} });

		await runModeSetup({
			argv,
			display,
			from,
			template,
		});

		expect(mockPrepareGitRepository).not.toHaveBeenCalled();
	});

	it("reports the error when prepareGitRepository rejects", async () => {
		const preparationError = new Error("Preparation error.");

		mockPromptForDirectory.mockResolvedValueOnce("test-directory");
		mockPromptForOptionSchemas.mockResolvedValueOnce({
			cancelled: false,
			prompted: {},
		});
		mockResolveLocalRepository.mockResolvedValueOnce({
			remote: { owner: "user", repository: "repo" },
			repositoryType: GitRepositoryType.None,
		});
		mockRunTemplate.mockResolvedValueOnce({ creation: {} });
		mockPrepareGitRepository.mockRejectedValueOnce(preparationError);

		const actual = await runModeSetup({
			argv,
			display,
			from,
			template,
		});

		expect(actual).toEqual({
			outro: CLIMessage.Leaving,
			status: CLIStatus.Error,
		});
	});

	it("logs a success outro and suggestions when everything succeeds", async () => {
		const suggestions = ["Suggestion."];

		mockPromptForDirectory.mockResolvedValueOnce("test-directory");
		mockPromptForOptionSchemas.mockResolvedValueOnce({
			cancelled: false,
			prompted: {},
		});
		mockResolveLocalRepository.mockResolvedValueOnce({});
		mockRunTemplate.mockResolvedValueOnce({ creation: {}, suggestions });

		const actual = await runModeSetup({
			argv,
			display,
			from,
			template,
		});

		expect(actual).toEqual({
			outro: `Thanks for using ${chalk.bgGreenBright.black(from)}! 💝`,
			status: CLIStatus.Success,
			suggestions,
		});
	});
});
