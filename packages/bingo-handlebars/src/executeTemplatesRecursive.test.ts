import { describe, expect, it } from "vitest";

import { executeTemplatesRecursive } from "./executeTemplatesRecursive.js";

const options = {
	abc: 123,
};

describe("executeTemplatesRecursive", () => {
	it("returns undefined when given undefined", () => {
		const actual = executeTemplatesRecursive(undefined, options);

		expect(actual).toBeUndefined();
	});

	it("returns a string when source is a file with no metadata", () => {
		const actual = executeTemplatesRecursive(["{{abc}}"], options);

		expect(actual).toBe("123");
	});

	it("returns a string when source is a file with empty metadata", () => {
		const actual = executeTemplatesRecursive(["{{abc}}", {}], options);

		expect(actual).toBe("123");
	});

	it("returns a string when source is a file with executable: false metadata", () => {
		const actual = executeTemplatesRecursive(
			["{{abc}}", { executable: false }],
			options,
		);

		expect(actual).toBe("123");
	});

	it("returns a tuple when source is a file with executable: true metadata", () => {
		const actual = executeTemplatesRecursive(
			["{{abc}}", { executable: true }],
			options,
		);

		expect(actual).toEqual(["123", { executable: true }]);
	});

	it("executes templates when source is a directory", () => {
		const actual = executeTemplatesRecursive(
			{
				files: {
					"first.hbs.txt": ["{{abc}}", { executable: true }],
				},
			},
			options,
		);

		expect(actual).toEqual({
			files: {
				"first.hbs.txt": ["123", { executable: true }],
			},
		});
	});
});
