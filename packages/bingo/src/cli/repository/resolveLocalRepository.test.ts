import { BingoSystem } from "bingo-systems";
import { describe, expect, it, vi } from "vitest";

import { Template } from "../../types/templates.js";
import { ClackDisplay } from "../display/createClackDisplay.js";
import { GitRepositoryType } from "../getGitRepositoryType.js";
import { resolveLocalRepository } from "./resolveLocalRepository.js";

const mockGetGitRepositoryType = vi.fn();

vi.mock("../getGitRepositoryType.js", async () => ({
	...(await vi.importActual("../getGitRepositoryType.js")),
	get getGitRepositoryType() {
		return mockGetGitRepositoryType;
	},
}));

const mockCreateRemoteRepository = vi.fn();

vi.mock("../remotes/createRemoteRepository.js", () => ({
	get createRemoteRepository() {
		return mockCreateRemoteRepository;
	},
}));

const mockResolveRemoteRepositoryFromOrigin = vi.fn();

vi.mock("../remotes/resolveRemoteRepositoryFromOrigin.js", () => ({
	get resolveRemoteRepositoryFromOrigin() {
		return mockResolveRemoteRepositoryFromOrigin;
	},
}));

const mockResolveRemoteRepositoryToCreate = vi.fn();

vi.mock("../remotes/resolveRemoteRepositoryToCreate.js", () => ({
	get resolveRemoteRepositoryToCreate() {
		return mockResolveRemoteRepositoryToCreate;
	},
}));

const stubOrigin = "stub-origin";
const stubRepository = "stub-repository";

const stubDisplay: ClackDisplay = {
	dumpItems: vi.fn(),
	item: vi.fn(),
	log: vi.fn(),
	spinner: {
		message: vi.fn(),
		start: vi.fn(),
		stop: vi.fn(),
	},
};

describe(resolveLocalRepository, () => {
	it("returns a remote error when both requests.remote and offline are true", async () => {
		mockGetGitRepositoryType.mockResolvedValueOnce(GitRepositoryType.Root);

		const actual = await resolveLocalRepository(
			stubDisplay,
			{ repository: stubRepository },
			{ offline: true, remote: true },
			{} as BingoSystem,
			{} as Template,
		);

		expect(actual).toEqual({
			remote: new Error("--offline cannot be combined with --remote."),
			repositoryType: GitRepositoryType.Root,
		});
		expect(mockResolveRemoteRepositoryFromOrigin).not.toHaveBeenCalled();
	});

	it("returns no remote when requests.remote is falsy and offline is true", async () => {
		mockGetGitRepositoryType.mockResolvedValueOnce(GitRepositoryType.Root);

		const actual = await resolveLocalRepository(
			stubDisplay,
			{ repository: stubRepository },
			{ offline: true, remote: false },
			{} as BingoSystem,
			{} as Template,
		);

		expect(actual).toEqual({
			remote: undefined,
			repositoryType: GitRepositoryType.Root,
		});
		expect(mockResolveRemoteRepositoryFromOrigin).not.toHaveBeenCalled();
	});

	it("returns no remote when in a Git subdirectory and request.remote is falsy", async () => {
		mockGetGitRepositoryType.mockResolvedValueOnce(
			GitRepositoryType.Subdirectory,
		);

		const actual = await resolveLocalRepository(
			stubDisplay,
			{ repository: stubRepository },
			{},
			{} as BingoSystem,
			{} as Template,
		);

		expect(actual).toEqual({
			remote: undefined,
			repositoryType: GitRepositoryType.Subdirectory,
		});
	});

	it("returns a remote error when in a Git subdirectory and request.remote is true", async () => {
		mockGetGitRepositoryType.mockResolvedValueOnce(
			GitRepositoryType.Subdirectory,
		);

		const actual = await resolveLocalRepository(
			stubDisplay,
			{ repository: stubRepository },
			{ remote: true },
			{} as BingoSystem,
			{} as Template,
		);

		expect(actual).toEqual({
			remote: new Error(
				"--remote can only be used when in a non-Git directory or in the root of a Git directory.",
			),
			repositoryType: GitRepositoryType.Subdirectory,
		});
	});

	it("returns the origin when it already exists and request.remote is falsy", async () => {
		mockGetGitRepositoryType.mockResolvedValueOnce(GitRepositoryType.Root);
		mockResolveRemoteRepositoryFromOrigin.mockResolvedValueOnce({
			owner: stubOrigin,
			repository: stubRepository,
		});

		const actual = await resolveLocalRepository(
			stubDisplay,
			{ repository: stubRepository },
			{},
			{} as BingoSystem,
			{} as Template,
		);

		expect(actual).toEqual({
			message: {
				level: "step",
				text: `Detected existing remote origin repository`,
			},
			remote: {
				owner: stubOrigin,
				repository: stubRepository,
			},
			repositoryType: GitRepositoryType.Root,
		});
	});

	it("returns an error when an origin already exists and request.remote is true", async () => {
		mockGetGitRepositoryType.mockResolvedValueOnce(GitRepositoryType.Root);
		mockResolveRemoteRepositoryFromOrigin.mockResolvedValueOnce({
			owner: stubOrigin,
			repository: stubRepository,
		});

		const actual = await resolveLocalRepository(
			stubDisplay,
			{ repository: stubRepository },
			{ remote: true },
			{} as BingoSystem,
			{} as Template,
		);

		expect(actual).toEqual({
			remote: new Error(
				"--remote requested, but an origin remote already exists.",
			),
			repositoryType: GitRepositoryType.Root,
		});
	});

	it("returns no remote when there is no existing origin and both requests.remote and offline are falsy", async () => {
		mockGetGitRepositoryType.mockResolvedValueOnce(GitRepositoryType.Root);
		mockResolveRemoteRepositoryFromOrigin.mockResolvedValueOnce(undefined);

		const actual = await resolveLocalRepository(
			stubDisplay,
			{ repository: stubRepository },
			{},
			{} as BingoSystem,
			{} as Template,
		);

		expect(actual).toEqual({
			remote: undefined,
			repositoryType: GitRepositoryType.Root,
		});
	});

	it("returns a remote error when there is no existing origin, requests.remote is true, and there is no Octokit fetcher", async () => {
		mockGetGitRepositoryType.mockResolvedValueOnce(GitRepositoryType.Root);
		mockResolveRemoteRepositoryFromOrigin.mockResolvedValueOnce(undefined);

		const actual = await resolveLocalRepository(
			stubDisplay,
			{ repository: stubRepository },
			{ remote: true },
			{ fetchers: {} } as BingoSystem,
			{} as Template,
		);

		expect(actual).toEqual({
			remote: new Error(
				"--remote requested, but no existing repository or GitHub authentication found. Please log in with the GitHub CLI or set a GH_AUTH env variable.",
			),
			repositoryType: GitRepositoryType.Root,
		});
	});

	it("returns the error when resolving a remote repository to create fails", async () => {
		mockGetGitRepositoryType.mockResolvedValueOnce(GitRepositoryType.Root);
		const creationLocator = new Error("Could not create remote.");

		mockResolveRemoteRepositoryFromOrigin.mockResolvedValueOnce(undefined);
		mockResolveRemoteRepositoryToCreate.mockResolvedValueOnce(creationLocator);

		const actual = await resolveLocalRepository(
			stubDisplay,
			{ repository: stubRepository },
			{ remote: true },
			{ fetchers: { octokit: {} } } as BingoSystem,
			{} as Template,
		);

		expect(actual).toEqual({
			remote: creationLocator,
			repositoryType: GitRepositoryType.Root,
		});
	});

	it("returns the error when resolving a remote repository to create succeeds and creating a new repository fails", async () => {
		mockGetGitRepositoryType.mockResolvedValueOnce(GitRepositoryType.Root);
		const creationError = new Error("Could not create repository.");

		mockResolveRemoteRepositoryFromOrigin.mockResolvedValueOnce(undefined);
		mockResolveRemoteRepositoryToCreate.mockResolvedValueOnce({
			owner: stubOrigin,
			repository: stubRepository,
		});
		mockCreateRemoteRepository.mockResolvedValueOnce(creationError);

		const actual = await resolveLocalRepository(
			stubDisplay,
			{ repository: stubRepository },
			{ remote: true },
			{ fetchers: { octokit: {} } } as BingoSystem,
			{} as Template,
		);

		expect(actual).toEqual({
			remote: creationError,
			repositoryType: GitRepositoryType.Root,
		});
	});

	it("returns the locator when resolving a remote repository to create succeeds and creating a new repository succeeds", async () => {
		mockGetGitRepositoryType.mockResolvedValueOnce(GitRepositoryType.Root);
		const creationLocator = {
			owner: stubOrigin,
			repository: stubRepository,
		};

		mockResolveRemoteRepositoryFromOrigin.mockResolvedValueOnce(undefined);
		mockResolveRemoteRepositoryToCreate.mockResolvedValueOnce(creationLocator);
		mockCreateRemoteRepository.mockResolvedValueOnce(creationLocator);

		const actual = await resolveLocalRepository(
			stubDisplay,
			{ repository: stubRepository },
			{ remote: true },
			{ fetchers: { octokit: {} } } as BingoSystem,
			{} as Template,
		);

		expect(actual).toEqual({
			remote: creationLocator,
			repositoryType: GitRepositoryType.Root,
		});
	});
});
