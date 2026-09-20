import { Endpoints, RequestParameters } from "@octokit/types";
import { createInput, InputContextWithArgs } from "bingo";
import { GitHubEndpoint } from "bingo-requests";
import { z } from "zod";

/**
 * Args for {@link inputFromOctokit}.
 * @template Endpoint GitHub API endpoint, such as `GET /repos/{owner}/{repo}/labels`.
 */
export type InputFromOctokitArgs<Endpoint extends GitHubEndpoint> =
	object extends Endpoints[Endpoint]["parameters"]
		? {
				/**
				 * Octokit endpoint to send to.
				 */
				endpoint: Endpoint;

				/**
				 * Parameter data to attach to the request.
				 */
				options?: InputFromOctokitOptions<Endpoint>;
			}
		: {
				/**
				 * Octokit endpoint to send to.
				 */
				endpoint: Endpoint;

				/**
				 * Parameter data to attach to the request.
				 */
				options: InputFromOctokitOptions<Endpoint>;
			};

/**
 * Parameter data to attach to a request to an endpoint.
 * @template Endpoint GitHub API endpoint, such as `GET /repos/{owner}/{repo}/labels`.
 */
export type InputFromOctokitOptions<Endpoint extends GitHubEndpoint> =
	RequestParameters & WithReadonlyArrays<Endpoints[Endpoint]["parameters"]>;

type WithReadonlyArrays<T> = T extends readonly (infer Item)[]
	? readonly WithReadonlyArrays<Item>[]
	: T extends object
		? { [Key in keyof T]: WithReadonlyArrays<T[Key]> }
		: T;

/**
 * Result from {@link inputFromOctokit}: the response data, or `undefined` if the request could not be made.
 * @template Endpoint GitHub API endpoint, such as `GET /repos/{owner}/{repo}/labels`.
 */
export type InputFromOctokitResult<Endpoint extends GitHubEndpoint> =
	| Endpoints[Endpoint]["response"]["data"]
	| undefined;

const inputFromOctokitArgs = {
	endpoint: z.string(),
	options: z
		.looseObject({
			headers: z
				.record(z.string(), z.union([z.number(), z.string(), z.undefined()]))
				.optional(),
			request: z.record(z.string(), z.unknown()).optional(),
		})
		.optional(),
};

/**
 * Input that sends a GitHub API request with Octokit.
 */
export interface InputFromOctokit {
	<Endpoint extends GitHubEndpoint>(
		context: InputContextWithArgs<InputFromOctokitArgs<Endpoint>>,
	): Promise<InputFromOctokitResult<Endpoint>>;
	args: typeof inputFromOctokitArgs;
}

export const inputFromOctokit = createInput({
	args: inputFromOctokitArgs,
	async produce({ args, fetchers, offline }): Promise<unknown> {
		if (offline || !fetchers.octokit) {
			return undefined;
		}

		try {
			const response = await fetchers.octokit.request(args.endpoint, {
				...args.options,
				headers: {
					"X-GitHub-Api-Version": "2022-11-28",
					...args.options?.headers,
				},
				request: {
					retries: 0,
					...args.options?.request,
				},
			});

			return response.data;
		} catch {
			return undefined;
		}
	},
}) as InputFromOctokit;
