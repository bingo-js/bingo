import { describe, expect, it } from "vitest";
import { z } from "zod";

import { getUnknownFlags } from "./getUnknownFlags.js";

describe(getUnknownFlags, () => {
	it("returns an empty array when all flags are known CLI flags", () => {
		const actual = getUnknownFlags({ mode: "setup", offline: true }, {});

		expect(actual).toEqual([]);
	});

	it("returns an empty array when a flag is a template option", () => {
		const actual = getUnknownFlags(
			{ title: "My Title" },
			{ title: z.string() },
		);

		expect(actual).toEqual([]);
	});

	it("returns a suggestion when an unknown flag is close to a known CLI flag", () => {
		const actual = getUnknownFlags({ "skip-file": true }, {});

		expect(actual).toEqual([{ flag: "skip-file", suggestion: "skip-files" }]);
	});

	it("returns a suggestion when an unknown flag is close to a template option", () => {
		const actual = getUnknownFlags(
			{ titles: "My Title" },
			{ title: z.string() },
		);

		expect(actual).toEqual([{ flag: "titles", suggestion: "title" }]);
	});

	it("returns no suggestion when an unknown flag is not close to any known flag", () => {
		const actual = getUnknownFlags({ wat: true }, {});

		expect(actual).toEqual([{ flag: "wat", suggestion: undefined }]);
	});

	it("returns all unknown flags when multiple are provided", () => {
		const actual = getUnknownFlags({ "skip-file": true, wat: true }, {});

		expect(actual).toEqual([
			{ flag: "skip-file", suggestion: "skip-files" },
			{ flag: "wat", suggestion: undefined },
		]);
	});
});
