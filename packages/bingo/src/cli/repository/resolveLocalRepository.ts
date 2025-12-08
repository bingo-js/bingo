import { BingoSystem } from "bingo-systems";
import { RepositoryLocator } from "new-github-repository";

import { Template } from "../../types/templates.js";
import { ClackDisplay } from "../display/createClackDisplay.js";
import {
	getGitRepositoryType,
	GitRepositoryType,
} from "../getGitRepositoryType.js";
import { createRemoteRepository } from "../remotes/createRemoteRepository.js";
import { resolveRemoteRepositoryFromOrigin } from "../remotes/resolveRemoteRepositoryFromOrigin.js";
import { resolveRemoteRepositoryToCreate } from "../remotes/resolveRemoteRepositoryToCreate.js";
import { PartialRepositoryLocator } from "../remotes/types.js";

export interface RemoteRepositoryRequest {
	offline?: boolean | undefined;
	remote?: boolean | undefined;
}

export interface ResolvedRemoteMessage {
	level: "step" | "warn";
	text: string;
}

export interface ResolvedRepository {
	message?: ResolvedRemoteMessage | undefined;
	remote: Error | RepositoryLocator | undefined;
	repositoryType: GitRepositoryType;
}

export async function resolveLocalRepository(
	display: ClackDisplay,
	locator: PartialRepositoryLocator,
	request: RemoteRepositoryRequest,
	system: BingoSystem,
	template: Template,
): Promise<ResolvedRepository> {
	const repositoryType = await getGitRepositoryType(system.runner);

	if (request.offline) {
		return {
			remote: request.remote
				? new Error("--offline cannot be combined with --remote.")
				: undefined,
			repositoryType,
		};
	}

	if (repositoryType === GitRepositoryType.Subdirectory) {
		return {
			remote: request.remote
				? new Error(
						"--remote can only be used when in a non-Git directory or in the root of a Git directory.",
					)
				: undefined,
			repositoryType,
		};
	}

	const origin =
		repositoryType === GitRepositoryType.Root &&
		(await resolveRemoteRepositoryFromOrigin(system.runner));

	if (origin) {
		if (request.remote) {
			return {
				remote: new Error(
					"--remote requested, but an origin remote already exists.",
				),
				repositoryType,
			};
		}

		return {
			message: {
				level: "step",
				text: `Detected existing remote origin repository`,
			},
			remote: origin,
			repositoryType,
		};
	}

	if (!request.remote) {
		return { remote: undefined, repositoryType };
	}

	if (!system.fetchers.octokit) {
		return {
			remote: new Error(
				"--remote requested, but no existing repository or GitHub authentication found. Please log in with the GitHub CLI or set a GH_AUTH env variable.",
			),
			repositoryType,
		};
	}

	const creationLocator = await resolveRemoteRepositoryToCreate(
		locator,
		system,
		template,
	);
	if (creationLocator instanceof Error) {
		return { remote: creationLocator, repositoryType };
	}

	const creationError = await createRemoteRepository(
		display,
		creationLocator,
		system,
		template,
	);

	return { remote: creationError ?? creationLocator, repositoryType };
}
