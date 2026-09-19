import { describe, expect, it, vi } from "vitest";

import { hasUncommittedChanges } from "./hasUncommittedChanges.js";

describe("hasUncommittedChanges", () => {
	it("returns false when git status has no stdout", async () => {
		const runner = vi.fn().mockResolvedValueOnce({
			failed: false,
			stdout: undefined,
		});

		const actual = await hasUncommittedChanges(runner);

		expect(actual).toBe(false);
	});

	it("returns false when git status has only whitespace stdout", async () => {
		const runner = vi
			.fn()
			.mockResolvedValueOnce({ failed: false, stdout: "\n" });

		const actual = await hasUncommittedChanges(runner);

		expect(actual).toBe(false);
	});

	it("returns true when git status lists changes", async () => {
		const runner = vi.fn().mockResolvedValueOnce({
			failed: false,
			stdout: " M package.json\n?? untracked.ts",
		});

		const actual = await hasUncommittedChanges(runner);

		expect(actual).toBe(true);
		expect(runner).toHaveBeenCalledWith(
			"git status --porcelain --untracked-files=normal",
		);
	});

	it("returns true when git status fails", async () => {
		const runner = vi.fn().mockResolvedValueOnce({ failed: true, stdout: "" });

		const actual = await hasUncommittedChanges(runner);

		expect(actual).toBe(true);
	});
});
