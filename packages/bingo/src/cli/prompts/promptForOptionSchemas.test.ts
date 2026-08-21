import { Octokit } from "octokit";
import { describe, expect, it, vi } from "vitest";
import { z } from "zod";

import { createTemplate } from "../../creators/createTemplate.js";
import { SystemContext } from "../../types/system.js";
import { promptForOptionSchemas } from "./promptForOptionSchemas.js";

const mockCancel = Symbol("cancel");

vi.mock("@clack/prompts", () => ({
	isCancel: (value: unknown) => value === mockCancel,
}));

const mockPromptForOptionSchema = vi.fn();

vi.mock("./promptForOptionSchema.js", () => ({
	get promptForOptionSchema() {
		return mockPromptForOptionSchema;
	},
}));

const directory = "my-directory";

const system: SystemContext = {
	directory,
	display: { item: vi.fn(), log: vi.fn() },
	fetchers: {
		fetch: vi.fn(),
		octokit: {} as Octokit,
	},
	fs: {
		glob: vi.fn(),
		readDirectory: vi.fn(),
		readFile: vi.fn(),
		writeDirectory: vi.fn(),
		writeFile: vi.fn(),
	},
	runner: vi.fn(),
};

describe(promptForOptionSchemas, () => {
	it("does not prompt when an optional option has no default", async () => {
		const template = createTemplate({
			options: { value: z.string().optional() },
			produce: vi.fn(),
		});

		const actual = await promptForOptionSchemas(template, {
			existing: {},
			system,
		});

		expect(actual).toEqual({
			cancelled: false,
			completed: { directory },
			prompted: {},
		});
		expect(mockPromptForOptionSchema).not.toHaveBeenCalled();
	});

	it("does not prompt when an option already has an existing value", async () => {
		const template = createTemplate({
			options: { value: z.string() },
			produce: vi.fn(),
		});

		const actual = await promptForOptionSchemas(template, {
			existing: { value: "abc" },
			system,
		});

		expect(actual).toEqual({
			cancelled: false,
			completed: { directory, value: "abc" },
			prompted: {},
		});
		expect(mockPromptForOptionSchema).not.toHaveBeenCalled();
	});

	it("prompts with the schema's description and default when an option is required", async () => {
		mockPromptForOptionSchema.mockResolvedValueOnce("prompted value");
		const template = createTemplate({
			options: {
				value: z.string().describe("very cool value").default("abc"),
			},
			produce: vi.fn(),
		});

		const actual = await promptForOptionSchemas(template, {
			existing: {},
			system,
		});

		expect(actual).toEqual({
			cancelled: false,
			completed: { directory, value: "prompted value" },
			prompted: { value: "prompted value" },
		});
		expect(mockPromptForOptionSchema).toHaveBeenCalledWith(
			"value",
			template.options.value,
			"very cool value",
			"abc",
		);
	});

	it("returns cancelled when a prompt is cancelled", async () => {
		mockPromptForOptionSchema.mockResolvedValueOnce(mockCancel);
		const template = createTemplate({
			options: { value: z.string() },
			produce: vi.fn(),
		});

		const actual = await promptForOptionSchemas(template, {
			existing: {},
			system,
		});

		expect(actual).toEqual({ cancelled: true, prompted: {} });
	});
});
