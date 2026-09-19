import { describe, expect, test } from "vitest";
import { z } from "zod";

import { getSchemaTypeName } from "./getSchemaTypeName.js";

describe("getSchemaTypeName", () => {
	test.each([
		["string", z.string(), "string"],
		["number", z.number(), "number"],
		["boolean", z.boolean(), "boolean"],
		["object", z.object({}), "object"],
		["record", z.record(z.string(), z.string()), "record"],
		["optional string", z.string().optional(), "string"],
		["default string", z.string().default("abc"), "string"],
		["nullable string", z.string().nullable(), "string"],
		[
			"transformed string",
			z.string().transform((value) => value.length),
			"string",
		],
		["array of strings", z.array(z.string()), "string[]"],
		["array of arrays of numbers", z.array(z.array(z.number())), "number[][]"],
		["string literal", z.literal("abc"), `"abc"`],
		["number literal", z.literal(123), "123"],
		["multiple literal values", z.literal(["abc", "def"]), `"abc" | "def"`],
		[
			"union of literals",
			z.union([z.literal("abc"), z.literal("def")]),
			`"abc" | "def"`,
		],
		[
			"union including an object",
			z.union([z.literal("abc"), z.object({})]),
			`"abc"`,
		],
	])("%s", (_, schema, expected) => {
		expect(getSchemaTypeName(schema)).toBe(expected);
	});
});
