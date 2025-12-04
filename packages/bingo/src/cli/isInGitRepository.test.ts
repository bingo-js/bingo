import { describe, expect, it, vi } from "vitest";

import { isInGitRepository } from "./isInGitRepository.js";

describe("isInGitRepository", () => {
	it("returns false when git rev-parse --git-dir has no message", async () => {
		const runner = vi.fn().mockResolvedValueOnce({
			message: undefined,
		});

		const actual = await isInGitRepository(runner);

		expect(actual).toBe(false);
	});

	it("returns false when git rev-parse --git-dir has explicit non-Git stdout", async () => {
		const runner = vi.fn().mockResolvedValueOnce({
			message: "fatal: not a git repository ...",
		});

		const actual = await isInGitRepository(runner);

		expect(actual).toBe(false);
	});

	it("returns true when git rev-parse --git-dir has Git-related stdout", async () => {
		const runner = vi.fn().mockResolvedValueOnce({
			message: "/.git",
		});

		const actual = await isInGitRepository(runner);

		expect(actual).toBe(true);
	});
});
