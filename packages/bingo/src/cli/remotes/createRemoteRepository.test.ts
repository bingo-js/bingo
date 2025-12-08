import { BingoSystem } from "bingo-systems";
import chalk from "chalk";
import { describe, expect, it, vi } from "vitest";

import { Template } from "../../types/templates.js";
import { ClackDisplay } from "../display/createClackDisplay.js";
import { createRemoteRepository } from "./createRemoteRepository.js";

const mockLog = {
	error: vi.fn(),
	step: vi.fn(),
};

vi.mock("@clack/prompts", () => ({
	get log() {
		return mockLog;
	},
}));

const mockNewGitHubRepository = vi.fn();

vi.mock("new-github-repository", () => ({
	get newGitHubRepository() {
		return mockNewGitHubRepository;
	},
}));

const mockPrepareGitRepository = vi.fn();

vi.mock("../repository/prepareGitRepository.js", () => ({
	get prepareGitRepository() {
		return mockPrepareGitRepository;
	},
}));

const stubDisplay: ClackDisplay = {
	dumpItems: vi.fn(),
	item: vi.fn(),
	log: vi.fn(),
	spinner: {
		message: vi.fn(),
		start: vi.fn(),
		stop: vi.fn(),
	},
};

const stubLocator = { owner: "owner", repository: "repository" };

const stubSystem = { fetchers: {} } as BingoSystem;

describe(createRemoteRepository, () => {
	it("returns the error without logging when creating the remote repository fails", async () => {
		const creationError = new Error("Creation failed.");

		mockNewGitHubRepository.mockRejectedValueOnce(creationError);

		const actual = await createRemoteRepository(
			stubDisplay,
			stubLocator,
			stubSystem,
			{} as Template,
		);

		expect(actual).toBe(creationError);
		expect(mockLog.step).not.toHaveBeenCalled();
	});

	it("logs when creating the remote repository succeeds", async () => {
		const actual = await createRemoteRepository(
			stubDisplay,
			stubLocator,
			stubSystem,
			{} as Template,
		);

		expect(actual).toBe(undefined);
		expect(mockLog.step).toHaveBeenCalledWith(
			[
				"You've got a new repository ready to use in:",
				`  ${chalk.green(`https://github.com/owner/repository`)}`,
			].join("\n"),
		);
	});
});
