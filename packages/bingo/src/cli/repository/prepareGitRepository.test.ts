import { describe, expect, it, vi } from "vitest";

import { prepareGitRepository } from "./prepareGitRepository.js";

const mockCreateInitialCommit = vi.fn();

vi.mock("./createInitialCommit.js", () => ({
	get createInitialCommit() {
		return mockCreateInitialCommit;
	},
}));

vi.mock("./createTrackingBranches.js", () => ({
	createTrackingBranches: vi.fn(),
}));

vi.mock("./clearLocalGitTags.js", () => ({
	clearLocalGitTags: vi.fn(),
}));

describe(prepareGitRepository, () => {
	it("pushes in createInitialCommit when locator is defined", async () => {
		const runner = vi.fn();
		const locator = { owner: "TestOwner", repository: "test-repository" };

		await prepareGitRepository(locator, runner);

		expect(mockCreateInitialCommit).toHaveBeenCalledWith(runner, {
			push: true,
		});
	});

	it("does not push in createInitialCommit when locator is not defined", async () => {
		const runner = vi.fn();

		await prepareGitRepository(undefined, runner);

		expect(mockCreateInitialCommit).toHaveBeenCalledWith(runner, {
			push: false,
		});
	});
});
