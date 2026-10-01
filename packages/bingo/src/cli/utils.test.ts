import { describe, expect, it } from "vitest";

import { makeRelative, quoteIfSpaced } from "./utils.js";

describe("makeRelative", () => {
	it.each([
		[".", "."],
		["./template.js", "./template.js"],
		["../template.js", "../template.js"],
		["template.js", "./template.js"],
	])("when given %j, returns %j", (item, expected) => {
		expect(makeRelative(item)).toBe(expected);
	});
});

describe("quoteIfSpaced", () => {
	it.each([
		["", ""],
		["/path/to/template.js", "/path/to/template.js"],
		["/path with spaces/template.js", '"/path with spaces/template.js"'],
	])("when given %j, returns %j", (text, expected) => {
		expect(quoteIfSpaced(text)).toBe(expected);
	});
});
