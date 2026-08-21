import * as prompts from "@clack/prompts";
import { styleText } from "node:util";
import { describe, expect, it, vi } from "vitest";

import { logUnknownFlags } from "./logUnknownFlags.js";

vi.mock("@clack/prompts", () => ({
	log: {
		error: vi.fn(),
	},
}));

describe(logUnknownFlags, () => {
	it("logs a suggestion when the unknown flag has one", () => {
		logUnknownFlags([{ flag: "skip-file", suggestion: "skip-files" }]);

		expect(prompts.log.error).toHaveBeenCalledWith(
			[
				`Unknown CLI flag: ${styleText("red", "--skip-file")}`,
				`  Did you mean ${styleText("green", "--skip-files")}?`,
			].join("\n"),
		);
	});

	it("logs only the flag when the unknown flag has no suggestion", () => {
		logUnknownFlags([{ flag: "wat" }]);

		expect(prompts.log.error).toHaveBeenCalledWith(
			`Unknown CLI flag: ${styleText("red", "--wat")}`,
		);
	});

	it("logs a single dash when the unknown flag is one character", () => {
		logUnknownFlags([{ flag: "h" }]);

		expect(prompts.log.error).toHaveBeenCalledWith(
			`Unknown CLI flag: ${styleText("red", "-h")}`,
		);
	});

	it("logs each flag when multiple unknown flags are provided", () => {
		logUnknownFlags([
			{ flag: "skip-file", suggestion: "skip-files" },
			{ flag: "wat" },
		]);

		expect(prompts.log.error).toHaveBeenCalledWith(
			[
				`Unknown CLI flag: ${styleText("red", "--skip-file")}`,
				`  Did you mean ${styleText("green", "--skip-files")}?`,
				`Unknown CLI flag: ${styleText("red", "--wat")}`,
			].join("\n"),
		);
	});
});
