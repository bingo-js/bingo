import { styleText } from "node:util";
import { afterEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";

import { createTemplate } from "../creators/createTemplate.js";
import { createClackDisplay } from "./display/createClackDisplay.js";
import { runCLI } from "./runCLI.js";
import { CLIStatus } from "./status.js";

const mockLogHelpText = vi.fn();

vi.mock("./loggers/logHelpText.js", () => ({
	get logHelpText() {
		return mockLogHelpText;
	},
}));

const mockLogUnknownFlags = vi.fn();

vi.mock("./loggers/logUnknownFlags.js", () => ({
	get logUnknownFlags() {
		return mockLogUnknownFlags;
	},
}));

const mockLogInvalidFlags = vi.fn();

vi.mock("./loggers/logInvalidFlags.js", () => ({
	get logInvalidFlags() {
		return mockLogInvalidFlags;
	},
}));

const mockLogOutro = vi.fn();

vi.mock("./loggers/logOutro.js", () => ({
	get logOutro() {
		return mockLogOutro;
	},
}));

const mockReadProductionSettings = vi.fn();

vi.mock("./readProductionSettings.js", () => ({
	get readProductionSettings() {
		return mockReadProductionSettings;
	},
}));

const mockRunModeSetup = vi.fn();

vi.mock("./setup/runModeSetup.js", () => ({
	get runModeSetup() {
		return mockRunModeSetup;
	},
}));

const mockRunModeTransition = vi.fn();

vi.mock("./transition/runModeTransition.js", () => ({
	get runModeTransition() {
		return mockRunModeTransition;
	},
}));

const template = createTemplate({
	produce: vi.fn(),
});

const argv = ["npx", "bingo-example"];

describe("runCli", () => {
	afterEach(() => {
		vi.unstubAllEnvs();
	});

	it("logs unknown flags and errors when an unknown flag is provided", async () => {
		const actual = await runCLI({
			argv: [...argv, "--skip-file"],
			display: createClackDisplay(),
			from: "",
			template,
			values: { "skip-file": true } as object,
		});

		expect(mockLogUnknownFlags).toHaveBeenCalledWith([
			{ flag: "skip-file", suggestion: "skip-files" },
		]);
		expect(mockLogInvalidFlags).not.toHaveBeenCalled();
		expect(actual).toEqual({ status: CLIStatus.Error });
		expect(mockReadProductionSettings).not.toHaveBeenCalled();
	});

	it("logs unknown flags and invalid flags together when both are provided", async () => {
		const actual = await runCLI({
			argv: [...argv, "--skip-file", "--count", "abc"],
			display: createClackDisplay(),
			from: "",
			template: createTemplate({
				options: { count: z.number() as unknown },
				produce: vi.fn(),
			}),
			values: { help: true, "skip-file": true } as object,
		});

		expect(mockLogUnknownFlags).toHaveBeenCalledWith([
			{ flag: "skip-file", suggestion: "skip-files" },
		]);
		expect(mockLogInvalidFlags).toHaveBeenCalledWith([
			{
				flag: "count",
				kind: "invalid",
				message: '--count: Expected a number, received "abc".',
			},
		]);
		expect(actual).toEqual({ status: CLIStatus.Error });
		expect(mockLogHelpText).not.toHaveBeenCalled();
	});

	it("does not log unknown flags when only known CLI flags and template options are provided", async () => {
		mockReadProductionSettings.mockResolvedValueOnce({
			mode: "setup",
		});

		await runCLI({
			argv: [
				...argv,
				"--offline",
				"--mode",
				"setup",
				"--no-value",
				"--title=abc",
			],
			display: createClackDisplay(),
			from: "",
			template: createTemplate({
				options: {
					title: z.string() as unknown,
					value: z.boolean().default(true) as unknown,
				},
				produce: vi.fn(),
			}),
			values: { mode: "setup", offline: true },
		});

		expect(mockLogUnknownFlags).not.toHaveBeenCalled();
		expect(mockLogInvalidFlags).not.toHaveBeenCalled();
		expect(mockRunModeSetup).toHaveBeenCalled();
	});

	it("logs invalid flags and errors when a template option's value can't be converted", async () => {
		mockReadProductionSettings.mockResolvedValueOnce({
			mode: "setup",
		});

		const actual = await runCLI({
			argv: [...argv, "--count", "abc"],
			display: createClackDisplay(),
			from: "",
			template: createTemplate({
				options: { count: z.number() as unknown },
				produce: vi.fn(),
			}),
			values: {},
		});

		expect(mockLogUnknownFlags).not.toHaveBeenCalled();
		expect(mockLogInvalidFlags).toHaveBeenCalledWith([
			{
				flag: "count",
				kind: "invalid",
				message: '--count: Expected a number, received "abc".',
			},
		]);
		expect(actual).toEqual({ status: CLIStatus.Error });
		expect(mockRunModeSetup).not.toHaveBeenCalled();
		expect(mockRunModeTransition).not.toHaveBeenCalled();
	});

	it("runs logHelpText instead of logging invalid flags when help is specified", async () => {
		mockReadProductionSettings.mockResolvedValueOnce({
			mode: "setup",
		});
		const template = createTemplate({
			options: { count: z.number() as unknown },
			produce: vi.fn(),
		});

		await runCLI({
			argv: [...argv, "--help", "--count"],
			display: createClackDisplay(),
			from: "",
			template,
			values: { help: true },
		});

		expect(mockLogInvalidFlags).not.toHaveBeenCalled();
		expect(mockLogHelpText).toHaveBeenCalledWith("setup", "", template);
		expect(mockRunModeSetup).not.toHaveBeenCalled();
	});

	it("returns an error when a template option's schema doesn't support Standard JSON Schema", async () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { jsonSchema, ...standard } = z.string()["~standard"];
		const actual = await runCLI({
			argv,
			display: createClackDisplay(),
			from: "",
			template: createTemplate({
				options: { title: { "~standard": standard } as unknown },
				produce: vi.fn(),
			}),
			values: { help: true },
		});

		expect(actual).toEqual({
			error: new Error(
				"This template's options must be created with Zod 4.2 or newer, but these were created with an older version: --title.\nUpdate the template's zod dependency to ^4.2.0 or newer.",
			),
			status: CLIStatus.Error,
		});
		expect(mockReadProductionSettings).not.toHaveBeenCalled();
		expect(mockLogHelpText).not.toHaveBeenCalled();
	});

	it("logs the error when readProductionSettings resolves an error", async () => {
		const error = new Error("Oh no!");
		mockReadProductionSettings.mockResolvedValueOnce(error);

		const actual = await runCLI({
			argv,
			display: createClackDisplay(),
			from: "",
			template,
			values: {},
		});

		expect(mockLogOutro).toHaveBeenCalledWith(styleText("red", error.message));
		expect(actual).toBe(CLIStatus.Error);
	});

	it("runs logHelpText when help is specified", async () => {
		mockReadProductionSettings.mockResolvedValueOnce({
			mode: "setup",
		});

		await runCLI({
			argv,
			display: createClackDisplay(),
			from: "",
			template,
			values: {
				help: true,
			},
		});

		expect(mockLogHelpText).toHaveBeenCalledWith("setup", "", template);
		expect(mockRunModeSetup).not.toHaveBeenCalled();
		expect(mockRunModeTransition).not.toHaveBeenCalled();
	});

	it("runs runModeSetup when productionSettings.mode is setup", async () => {
		mockReadProductionSettings.mockResolvedValueOnce({
			mode: "setup",
		});

		await runCLI({
			argv,
			display: createClackDisplay(),
			from: "",
			template,
			values: {},
		});

		expect(mockLogOutro).not.toHaveBeenCalled();
		expect(mockRunModeSetup).toHaveBeenCalled();
		expect(mockRunModeTransition).not.toHaveBeenCalled();
	});

	it("runs runModeTransition when productionSettings.mode is transition", async () => {
		mockReadProductionSettings.mockResolvedValueOnce({
			mode: "transition",
		});

		await runCLI({
			argv,
			display: createClackDisplay(),
			from: "",
			template,
			values: {},
		});

		expect(mockLogOutro).not.toHaveBeenCalled();
		expect(mockRunModeSetup).not.toHaveBeenCalled();
		expect(mockRunModeTransition).toHaveBeenCalled();
	});

	it("provides skips.files when --skip-files is provided", async () => {
		mockReadProductionSettings.mockResolvedValueOnce({
			mode: "setup",
		});

		await runCLI({
			argv,
			display: createClackDisplay(),
			from: "",
			template,
			values: {
				"skip-files": true,
			},
		});

		expect(mockRunModeSetup).toHaveBeenCalledWith(
			expect.objectContaining({
				skips: {
					files: true,
				},
			}),
		);
	});

	it("provides skips.requests when --skip-requests is provided", async () => {
		mockReadProductionSettings.mockResolvedValueOnce({
			mode: "setup",
		});

		await runCLI({
			argv,
			display: createClackDisplay(),
			from: "",
			template,
			values: {
				"skip-requests": true,
			},
		});

		expect(mockRunModeSetup).toHaveBeenCalledWith(
			expect.objectContaining({
				skips: {
					requests: true,
				},
			}),
		);
	});

	it("provides skips.scripts when --skip-scripts is provided", async () => {
		mockReadProductionSettings.mockResolvedValueOnce({
			mode: "setup",
		});

		await runCLI({
			argv,
			display: createClackDisplay(),
			from: "",
			template,
			values: {
				"skip-scripts": true,
			},
		});

		expect(mockRunModeSetup).toHaveBeenCalledWith(
			expect.objectContaining({
				skips: {
					scripts: true,
				},
			}),
		);
	});
	it("provides a rerun command based on from when rerunFrom is not provided", async () => {
		vi.stubEnv("npm_config_user_agent", "");
		mockReadProductionSettings.mockResolvedValueOnce({
			mode: "setup",
		});

		await runCLI({
			argv,
			display: createClackDisplay(),
			from: "create-example",
			template,
			values: {},
		});

		expect(mockRunModeSetup).toHaveBeenCalledWith(
			expect.objectContaining({
				rerunCommand: "npx create-example",
			}),
		);
	});

	it("provides a rerun command based on rerunFrom when it is provided", async () => {
		vi.stubEnv("npm_config_user_agent", "");
		mockReadProductionSettings.mockResolvedValueOnce({
			mode: "setup",
		});

		await runCLI({
			argv,
			display: createClackDisplay(),
			from: "bingo",
			rerunFrom: "bingo /path/to/template.js",
			template,
			values: {},
		});

		expect(mockRunModeSetup).toHaveBeenCalledWith(
			expect.objectContaining({
				rerunCommand: "npx bingo /path/to/template.js",
			}),
		);
	});
});
