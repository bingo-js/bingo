import { describe, expect, it, vi } from "vitest";

import { checkUncommittedChanges } from "./checkUncommittedChanges.js";

describe("checkUncommittedChanges", () => {
	it("returns clean when git status has no stdout", async () => {
		const runner = vi.fn().mockResolvedValueOnce({
			failed: false,
			stdout: undefined,
		});

		const actual = await checkUncommittedChanges(runner);

		expect(actual).toBe("clean");
	});

	it("returns clean when git status has only whitespace stdout", async () => {
		const runner = vi
			.fn()
			.mockResolvedValueOnce({ failed: false, stdout: "\n" });

		const actual = await checkUncommittedChanges(runner);

		expect(actual).toBe("clean");
	});

	it("returns changes when git status lists changes", async () => {
		const runner = vi.fn().mockResolvedValueOnce({
			failed: false,
			stdout: " M package.json\n?? untracked.ts",
		});

		const actual = await checkUncommittedChanges(runner);

		expect(actual).toBe("changes");
		expect(runner).toHaveBeenCalledWith(
			"git status --porcelain --untracked-files=normal",
		);
	});

	it("returns unknown when git status fails", async () => {
		const runner = vi.fn().mockResolvedValueOnce({ failed: true, stdout: "" });

		const actual = await checkUncommittedChanges(runner);

		expect(actual).toBe("unknown");
	});
});
