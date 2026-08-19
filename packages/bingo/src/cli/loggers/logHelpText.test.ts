import { describe, expect, it, test, vi } from "vitest";
import { z } from "zod";

import { createTemplate } from "../../creators/createTemplate.js";
import { cliArgsOptions } from "../parseProcessArgv.js";
import { logHelpText } from "./logHelpText.js";

const mockLog = {
	info: vi.fn(),
	message: vi.fn<(message: string) => void>(),
};

vi.mock("@clack/prompts", () => ({
	get log() {
		return mockLog;
	},
}));

describe("logHelpText", () => {
	it("prints every CLI flag", () => {
		logHelpText(
			"setup",
			"./template.js",
			createTemplate({
				produce: vi.fn(),
			}),
		);

		const [[message]] = mockLog.message.mock.calls;
		const missing = Object.keys(cliArgsOptions).filter(
			(flag) => !message.includes(`--${flag} (`),
		);

		expect(missing).toEqual([]);
	});

	test("anonymous template with no options", () => {
		logHelpText(
			"setup",
			"./template.js",
			createTemplate({
				produce: vi.fn(),
			}),
		);

		expect(mockLog.info.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    "Running --help for --mode setup.",
			  ],
			]
		`);
		expect(mockLog.message.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    "Bingo template options:

			  --directory (string): What local directory path to run under
			      npx ./template.js --directory my-fancy-project

			  --help (boolean): Prints help text.
			      npx ./template.js --help

			  --mode ("setup" | "transition"): Which mode to run in.
			      npx ./template.js --mode setup
			      npx ./template.js --mode transition

			  --offline (boolean): Whether to run in an "offline" mode that skips network requests.
			      npx ./template.js --offline

			  --owner (string): What GitHub organization or user the repository will be under.
			      npx ./template.js --owner my-org

			  --remote (boolean): Whether to create a remote repository on GitHub if one does not already exist.
			      npx ./template.js --remote

			  --repository (string): What the repository will be named.
			      npx ./template.js --repository my-fancy-project

			  --skip-files (boolean): Whether to skip creating files on disk.
			      npx ./template.js --skip-files

			  --skip-requests (boolean): Whether to skip sending network requests as specified by templates.
			      npx ./template.js --skip-requests

			  --skip-scripts (boolean): Whether to skip running local scripts as specified by templates.
			      npx ./template.js --skip-scripts

			  --version (boolean): Prints package versions.
			      npx ./template.js --version
			",
			  ],
			  [
			    "./template.js options:
			",
			  ],
			]
		`);
	});

	test("named template with options", () => {
		logHelpText(
			"setup",
			"./template.js",
			createTemplate({
				about: { name: "My Template" },
				options: {
					first: z.number().describe("My first option"),
					second: z.number().describe("My second option"),
				},
				produce: vi.fn(),
			}),
		);

		expect(mockLog.info.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    "Running --help for --mode setup.",
			  ],
			]
		`);
		expect(mockLog.message.mock.calls).toMatchInlineSnapshot(`
			[
			  [
			    "Bingo template options:

			  --directory (string): What local directory path to run under
			      npx ./template.js --directory my-fancy-project

			  --help (boolean): Prints help text.
			      npx ./template.js --help

			  --mode ("setup" | "transition"): Which mode to run in.
			      npx ./template.js --mode setup
			      npx ./template.js --mode transition

			  --offline (boolean): Whether to run in an "offline" mode that skips network requests.
			      npx ./template.js --offline

			  --owner (string): What GitHub organization or user the repository will be under.
			      npx ./template.js --owner my-org

			  --remote (boolean): Whether to create a remote repository on GitHub if one does not already exist.
			      npx ./template.js --remote

			  --repository (string): What the repository will be named.
			      npx ./template.js --repository my-fancy-project

			  --skip-files (boolean): Whether to skip creating files on disk.
			      npx ./template.js --skip-files

			  --skip-requests (boolean): Whether to skip sending network requests as specified by templates.
			      npx ./template.js --skip-requests

			  --skip-scripts (boolean): Whether to skip running local scripts as specified by templates.
			      npx ./template.js --skip-scripts

			  --version (boolean): Prints package versions.
			      npx ./template.js --version
			",
			  ],
			  [
			    "My Template options:

			  --first (number): My first option.
			  --second (number): My second option.",
			  ],
			]
		`);
	});
});
