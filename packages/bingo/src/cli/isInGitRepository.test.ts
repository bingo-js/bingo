import { describe, expect, it, vi } from "vitest";

import { isInGitRepository } from "./isInGitRepository.js";

describe("isInGitRepository", () => {
	it("returns true when git rev-parse --git-dir has stdout", async () => {
		const runner = vi.fn().mockResolvedValueOnce({ stdout: "/.git" });

		expect(await isInGitRepository(runner)).toBe(true);

		expect(runner).toHaveBeenCalledTimes(1);
		expect(runner).toHaveBeenCalledWith(`git rev-parse --git-dir`);
	});

	it("returns false when git rev-parse --git-dir has no stdout", async () => {
		const runner = vi
			.fn()
			.mockRejectedValueOnce(new Error("Not a Git repository"));

		expect(await isInGitRepository(runner)).toBe(false);

		expect(runner).toHaveBeenCalledTimes(1);
		expect(runner).toHaveBeenCalledWith(`git rev-parse --git-dir`);
	});
});
