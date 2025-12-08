import { BingoSystem, WritingFileSystem } from "bingo-systems";
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
	it("returns the locator if locator.owner is provided", async () => {
		const locator = { owner: stubOwner, repository: stubRepository };

		const result = await resolveRemoteRepositoryToCreate(
			locator,
			mockSystem,
			createTemplate({ produce: vi.fn() }),
		);

		expect(result).toEqual(locator);
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

	it("returns the prompted owner when prompting succeeds", async () => {
		mockPromptForOptionSchema.mockResolvedValueOnce(stubOwner);

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
