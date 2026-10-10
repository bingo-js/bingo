import { Octokit } from "octokit";
import { describe, expect, test, vi } from "vitest";
import { z } from "zod";

import { createBase } from "../creators/createBase.js";
import { runBlock } from "./runBlock.js";

const base = createBase({
	options: {
		title: z.string(),
	},
});

function createSystem() {
	return {
		fetchers: {
			fetch: noop("fetch"),
			octokit: {} as Octokit,
		},
		fs: {
			glob: noop("glob"),
			readDirectory: noop("readDirectory"),
			readFile: noop("readFile"),
			removeFile: vi.fn(),
			writeDirectory: vi.fn(),
			writeFile: vi.fn(),
		},
		runner: noop("runner"),
	};
}

function noop(label: string) {
	return vi.fn().mockReturnValue(`Not implemented: ${label}`);
}

describe(runBlock, () => {
	test("Block without Props", async () => {
		const block = base.createBlock({
			produce({ options }) {
				return {
					files: {
						"README.md": `# ${options.title}`,
					},
				};
			},
		});

		const system = createSystem();

		await runBlock(block, {
			options: { title: "abc" },
			...system,
		});

		expect({
			writeDirectory: system.fs.writeDirectory.mock.calls,
			writeFile: system.fs.writeFile.mock.calls,
		}).toMatchInlineSnapshot(`
			{
			  "writeDirectory": [
			    [
			      ".",
			    ],
			  ],
			  "writeFile": [
			    [
			      "README.md",
			      "# abc",
			    ],
			  ],
			}
		`);
	});

	describe("Block with Props", () => {
		const block = base.createBlock({
			produce({ options, props }) {
				return {
					files: {
						"README.md": `# ${options.title}\n${props.descriptions.join("\n")}`,
					},
				};
			},
			props: {
				descriptions: z.array(z.string()).default([]),
			},
		});

		test("default Prop value", async () => {
			const system = createSystem();

			await runBlock(block, {
				options: { title: "abc" },
				...system,
			});

			expect({
				writeDirectory: system.fs.writeDirectory.mock.calls,
				writeFile: system.fs.writeFile.mock.calls,
			}).toMatchInlineSnapshot(`
				{
				  "writeDirectory": [
				    [
				      ".",
				    ],
				  ],
				  "writeFile": [
				    [
				      "README.md",
				      "# abc
				",
				    ],
				  ],
				}
			`);
		});

		test("provided Prop value", async () => {
			const system = createSystem();

			await runBlock(block, {
				options: { title: "abc" },
				props: {
					descriptions: ["def"],
				},
				...system,
			});

			expect({
				writeDirectory: system.fs.writeDirectory.mock.calls,
				writeFile: system.fs.writeFile.mock.calls,
			}).toMatchInlineSnapshot(`
				{
				  "writeDirectory": [
				    [
				      ".",
				    ],
				  ],
				  "writeFile": [
				    [
				      "README.md",
				      "# abc
				def",
				    ],
				  ],
				}
			`);
		});
	});
});
