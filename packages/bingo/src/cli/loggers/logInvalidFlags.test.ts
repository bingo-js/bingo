import * as prompts from "@clack/prompts";
import { describe, expect, it, vi } from "vitest";

import { logInvalidFlags } from "./logInvalidFlags.js";

vi.mock("@clack/prompts", () => ({
	log: {
		error: vi.fn(),
	},
}));

describe(logInvalidFlags, () => {
	it("logs each issue's message on its own line", () => {
		logInvalidFlags([
			{ flag: "count", message: '--count: Expected a number, received "abc".' },
			{ flag: "title", message: "--title requires a value." },
		]);

		expect(prompts.log.error).toHaveBeenCalledWith(
			[
				'--count: Expected a number, received "abc".',
				"--title requires a value.",
			].join("\n"),
		);
	});
});
