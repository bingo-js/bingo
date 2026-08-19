import { describe, expect, it, vi } from "vitest";
import { z } from "zod";

import { promptForOptionSchema } from "./promptForOptionSchema.js";

const mockConfirm = vi.fn();
const mockSelect = vi.fn();
const mockText = vi.fn();

vi.mock("@clack/prompts", () => ({
	get confirm() {
		return mockConfirm;
	},
	isCancel: () => false,
	get select() {
		return mockSelect;
	},
	get text() {
		return mockText;
	},
}));

describe(promptForOptionSchema, () => {
	it("selects from the literals when the schema is a union of literals", async () => {
		mockSelect.mockResolvedValueOnce("private");

		const actual = await promptForOptionSchema(
			"type",
			z.union([z.literal("public"), z.literal("private")]),
			"package type",
			undefined,
		);

		expect(actual).toBe("private");
		expect(mockSelect).toHaveBeenCalledWith({
			initialValue: undefined,
			message: "What will the package type be? (--type)",
			options: [{ value: "public" }, { value: "private" }],
		});
	});

	it("selects from the values when the schema is an enum", async () => {
		mockSelect.mockResolvedValueOnce("restricted");

		const actual = await promptForOptionSchema(
			"access",
			z.enum(["public", "restricted"]),
			undefined,
			undefined,
		);

		expect(actual).toBe("restricted");
		expect(mockSelect).toHaveBeenCalledWith({
			initialValue: undefined,
			message: "What will the --access be?",
			options: [{ value: "public" }, { value: "restricted" }],
		});
	});

	it("prompts for the inner schema when the schema has a default", async () => {
		mockSelect.mockResolvedValueOnce("public");

		const actual = await promptForOptionSchema(
			"type",
			z
				.union([z.literal("public"), z.literal("private")])
				.describe("package type")
				.default("public"),
			undefined,
			"public",
		);

		expect(actual).toBe("public");
		expect(mockSelect).toHaveBeenCalledWith({
			initialValue: "public",
			message: "What will the package type be? (--type)",
			options: [{ value: "public" }, { value: "private" }],
		});
	});

	it("confirms when the schema is a boolean", async () => {
		mockConfirm.mockResolvedValueOnce(true);

		const actual = await promptForOptionSchema(
			"published",
			z.boolean(),
			undefined,
			false,
		);

		expect(actual).toBe(true);
	});

	it("prompts for text when the schema is a number", async () => {
		mockText.mockResolvedValueOnce("123");

		const actual = await promptForOptionSchema(
			"count",
			z.number(),
			undefined,
			undefined,
		);

		expect(actual).toBe(123);
	});

	it("prompts for text when the schema is a string", async () => {
		mockText.mockResolvedValueOnce("My Title");

		const actual = await promptForOptionSchema(
			"title",
			z.string(),
			"repository title",
			undefined,
		);

		expect(actual).toBe("My Title");
		expect(mockText).toHaveBeenCalledWith({
			message: "What will the repository title be? (--title)",
			placeholder: undefined,
			validate: expect.any(Function),
		});
	});
});
