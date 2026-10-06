import { describe, expect, it, vi } from "vitest";

import { validateNewDirectory } from "./validators.js";

const mockExistsSync = vi.fn();

vi.mock("node:fs", () => ({
	get existsSync() {
		return mockExistsSync;
	},
}));

describe("validateNewDirectory", () => {
	it("returns undefined when the directory does not exist", () => {
		mockExistsSync.mockReturnValueOnce(true);

		const actual = validateNewDirectory("dir");

		expect(actual).toBe(
			"That directory already exists. Please choose another one.",
		);
	});

	it("returns a complaint when the directory exists", () => {
		mockExistsSync.mockReturnValueOnce(true);

		const actual = validateNewDirectory("dir");

		expect(actual).toBe(
			"That directory already exists. Please choose another one.",
		);
	});

	it("returns a complaint when the directory name is empty", () => {
		const actual = validateNewDirectory("");

		expect(actual).toBe("Please enter a value.");
		expect(mockExistsSync).not.toHaveBeenCalled();
	});
});
