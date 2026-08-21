import { BingoSystem, WritingFileSystem } from "bingo-systems";
import chalk from "chalk";
import { Octokit } from "octokit";
import { describe, expect, it, vi } from "vitest";
import { z } from "zod";

import { createTemplate } from "../../creators/createTemplate.js";
import { resolveRemoteRepositoryToCreate } from "./resolveRemoteRepositoryToCreate.js";

const mockPromptForOptionSchema = vi.fn();

vi.mock("../prompts/promptForOptionSchema.js", () => ({
	get promptForOptionSchema() {
		return mockPromptForOptionSchema;
	},
}));

const mockLogWarn = vi.fn();

vi.mock("@clack/prompts", () => ({
	log: {
		get warn() {
			return mockLogWarn;
		},
	},
}));

const mockHasAccessToOwner = vi.fn();

vi.mock("./hasAccessToOwner.js", () => ({
	get hasAccessToOwner() {
		return mockHasAccessToOwner;
	},
}));

const stubOwner = "stub-owner";
const stubRepository = "stub-repo";

const mockSystem = {
	fetchers: {
		fetch: vi.fn(),
		octokit: {} as Octokit,
	},
	fs: {} as WritingFileSystem,
	runner: vi.fn(),
} as BingoSystem;

describe(resolveRemoteRepositoryToCreate, () => {
	it("returns the locator if locator.owner is provided and is accessible", async () => {
		mockHasAccessToOwner.mockResolvedValueOnce(true);
		const locator = { owner: stubOwner, repository: stubRepository };

		const result = await resolveRemoteRepositoryToCreate(
			locator,
			mockSystem,
			createTemplate({ produce: vi.fn() }),
		);

		expect(result).toEqual(locator);
	});

	it("returns an error if locator.owner is provided and is not accessible", async () => {
		mockHasAccessToOwner.mockResolvedValueOnce(false);

		const result = await resolveRemoteRepositoryToCreate(
			{ owner: stubOwner, repository: stubRepository },
			mockSystem,
			createTemplate({ produce: vi.fn() }),
		);

		expect(result).toEqual(
			new Error(
				`--remote requested, but the authenticated GitHub user does not have access to the ${stubOwner} owner.`,
			),
		);
	});

	it("returns the locator without checking access if locator.owner is provided and there is no octokit", async () => {
		const locator = { owner: stubOwner, repository: stubRepository };

		const result = await resolveRemoteRepositoryToCreate(
			locator,
			{ ...mockSystem, fetchers: { fetch: vi.fn(), octokit: undefined } },
			createTemplate({ produce: vi.fn() }),
		);

		expect(result).toEqual(locator);
		expect(mockHasAccessToOwner).not.toHaveBeenCalled();
	});

	it("returns the username as owner if gh config get user resolves one", async () => {
		const result = await resolveRemoteRepositoryToCreate(
			{ repository: stubRepository },
			{
				...mockSystem,
				runner: vi.fn().mockResolvedValueOnce({
					stdout: stubOwner,
				}),
			},
			createTemplate({ produce: vi.fn() }),
		);

		expect(result).toEqual({ owner: stubOwner, repository: stubRepository });
	});

	it("returns an error if an owner cannot be inferred and the template doesn't have a string owner option", async () => {
		const result = await resolveRemoteRepositoryToCreate(
			{ repository: stubRepository },
			{
				...mockSystem,
				runner: vi.fn().mockResolvedValueOnce({}),
			},
			createTemplate({ produce: vi.fn() }),
		);

		expect(result).toEqual(
			new Error(
				"--remote requested, but could not infer an owner because this template lacks an 'owner' option.",
			),
		);
	});

	it("returns an error if an owner cannot be inferred and the template's owner option is not a string-like", async () => {
		const result = await resolveRemoteRepositoryToCreate(
			{ repository: stubRepository },
			{
				...mockSystem,
				runner: vi.fn().mockResolvedValueOnce({}),
			},
			createTemplate({
				options: {
					owner: z.object({ value: z.number() }) as unknown,
				},
				produce: vi.fn(),
			}),
		);

		expect(result).toEqual(
			new Error(
				"--remote requested, but could not infer an owner because this template's owner option is not a string-like.",
			),
		);
	});

	it("returns the prompted owner when prompting succeeds and the owner is accessible", async () => {
		mockPromptForOptionSchema.mockResolvedValueOnce(stubOwner);
		mockHasAccessToOwner.mockResolvedValueOnce(true);

		const actual = await resolveRemoteRepositoryToCreate(
			{ repository: stubRepository },
			{
				...mockSystem,
				runner: vi.fn().mockResolvedValueOnce({}),
			},
			createTemplate({
				options: {
					owner: z.string() as unknown,
				},
				produce: vi.fn(),
			}),
		);

		expect(actual).toEqual({ owner: stubOwner, repository: stubRepository });
	});

	it("re-prompts when the prompted owner is not accessible", async () => {
		const inaccessibleOwner = "inaccessible-owner";

		mockPromptForOptionSchema
			.mockResolvedValueOnce(inaccessibleOwner)
			.mockResolvedValueOnce(stubOwner);
		mockHasAccessToOwner
			.mockResolvedValueOnce(false)
			.mockResolvedValueOnce(true);

		const actual = await resolveRemoteRepositoryToCreate(
			{ repository: stubRepository },
			{
				...mockSystem,
				runner: vi.fn().mockResolvedValueOnce({}),
			},
			createTemplate({
				options: {
					owner: z.string() as unknown,
				},
				produce: vi.fn(),
			}),
		);

		expect(actual).toEqual({ owner: stubOwner, repository: stubRepository });
		expect(mockLogWarn).toHaveBeenCalledWith(
			`The authenticated GitHub user does not have access to the ${chalk.green(inaccessibleOwner)} owner.`,
		);
	});

	it("returns an error when prompting fails", async () => {
		mockPromptForOptionSchema.mockResolvedValueOnce(new Error("Cancelled."));

		const actual = await resolveRemoteRepositoryToCreate(
			{ repository: stubRepository },
			{
				...mockSystem,
				runner: vi.fn().mockResolvedValueOnce({}),
			},
			createTemplate({
				options: {
					owner: z.string() as unknown,
				},
				produce: vi.fn(),
			}),
		);

		expect(actual).toEqual(
			new Error("--remote requested, but no owner was provided."),
		);
	});
});
