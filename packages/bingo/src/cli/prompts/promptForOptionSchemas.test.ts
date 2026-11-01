import { Octokit } from "octokit";
import { describe, expect, it, vi } from "vitest";
import { z } from "zod";

import { createTemplate } from "../../creators/createTemplate.js";
import { SystemContext } from "../../types/system.js";
import { promptForOptionSchemas } from "./promptForOptionSchemas.js";

const mockPromptForOptions = vi.fn();

vi.mock("parse-standard-args/prompts", () => ({
	get promptForOptions() {
		return mockPromptForOptions;
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
		removeFile: vi.fn(),
		writeDirectory: vi.fn(),
		writeFile: vi.fn(),
	},
	runner: vi.fn(),
};

describe(promptForOptionSchemas, () => {
	it("prompts with a flag for each option and existing values, including the system directory", async () => {
		const result = {
			cancelled: false,
			completed: { directory, title: "abc", value: "def" },
			prompted: { value: "def" },
		};
		mockPromptForOptions.mockResolvedValueOnce(result);
		const template = createTemplate({
			options: {
				title: z.string(),
				value: z.string().describe("very cool value").default("abc"),
			},
			produce: vi.fn(),
		});

		const actual = await promptForOptionSchemas(template, {
			existing: { title: "abc" },
			system,
		});

		expect(actual).toEqual(result);
		expect(mockPromptForOptions).toHaveBeenCalledWith({
			flags: [
				{
					key: "title",
					kind: "string",
					multiple: false,
					required: true,
					schema: template.options.title,
				},
				{
					default: "abc",
					description: "very cool value",
					key: "value",
					kind: "string",
					multiple: false,
					required: false,
					schema: template.options.value,
				},
			],
			values: { directory, title: "abc" },
		});
	});

	it("completes prompted values with their schemas' outputs while keeping prompted values as entered", async () => {
		mockPromptForOptions.mockResolvedValueOnce({
			cancelled: false,
			completed: { count: 1, directory, length: "abc", title: "xyz" },
			prompted: { count: 1, length: "abc" },
		});
		const template = createTemplate({
			options: {
				count: z.number(),
				length: z.string().transform((text) => text.length),
				title: z.string().transform((text) => text.toUpperCase()),
			},
			produce: vi.fn(),
		});

		const actual = await promptForOptionSchemas(template, {
			existing: { title: "xyz" },
			system,
		});

		expect(actual).toEqual({
			cancelled: false,
			completed: { count: 1, directory, length: 3, title: "xyz" },
			prompted: { count: 1, length: "abc" },
		});
	});

	it("prefers an existing directory over the system directory", async () => {
		mockPromptForOptions.mockResolvedValueOnce({
			cancelled: true,
			prompted: {},
		});
		const template = createTemplate({
			options: { directory: z.string() },
			produce: vi.fn(),
		});

		const actual = await promptForOptionSchemas(template, {
			existing: { directory: "other-directory" },
			system,
		});

		expect(actual).toEqual({ cancelled: true, prompted: {} });
		expect(mockPromptForOptions).toHaveBeenCalledWith(
			expect.objectContaining({
				values: { directory: "other-directory" },
			}),
		);
	});
});
