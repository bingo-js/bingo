import { describe, expect, it, vi } from "vitest";

import { createSystemRunner } from "./createSystemRunner.js";

const mockGetColorsEnv = vi.fn();

vi.mock("./getColorsEnv.js", () => ({
	get getColorsEnv() {
		return mockGetColorsEnv;
	},
}));

const mockExecutor = vi.fn();
const mockExeca = vi.fn().mockReturnValue(mockExecutor);

vi.mock("execa", async () => ({
	...(await vi.importActual("execa")),
	get execa() {
		return mockExeca;
	},
}));

describe("createSystemRunner", () => {
	it("executes the command from a custom directory when provided", async () => {
		const cwd = "path/to/repo";
		const runner = createSystemRunner(cwd);

		await runner("abc");

		expect(mockExeca.mock.calls).toEqual([[{ cwd, reject: false }]]);
		expect(mockExecutor.mock.calls).toEqual([[["", ""], ["abc"]]]);
	});

	it("executes the command with a colors env when the terminal supports colors", async () => {
		const env = { FORCE_COLOR: "3" };
		mockGetColorsEnv.mockReturnValueOnce(env);
		const runner = createSystemRunner();

		await runner("abc");

		expect(mockExeca.mock.calls).toEqual([[{ cwd: ".", env, reject: false }]]);
	});

	it("executes the command as a parsed command string when it includes spaces", async () => {
		const runner = createSystemRunner();

		await runner("a bc d");

		expect(mockExeca.mock.calls).toEqual([[{ cwd: ".", reject: false }]]);
		expect(mockExecutor.mock.calls).toEqual([
			[
				["", ""],
				["a", "bc", "d"],
			],
		]);
	});
});
