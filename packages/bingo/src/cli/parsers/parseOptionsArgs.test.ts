import { describe, expect, test } from "vitest";
import { z } from "zod";

import { parseOptionsArgs } from "./parseOptionsArgs.js";

describe("parseOptionsArgs", () => {
	test("boolean parsing success", () => {
		const args = ["--value"];
		const options = { value: z.boolean() };

		const actual = parseOptionsArgs(args, options);

		expect(actual).toEqual({
			issues: [],
			unknown: {},
			values: { value: true },
		});
	});

	test("negated boolean parsing success", () => {
		const args = ["--no-value"];
		const options = { value: z.boolean().default(true) };

		const actual = parseOptionsArgs(args, options);

		expect(actual.values).toEqual({ value: false });
	});

	test("union of booleans literal parsing success", () => {
		const args = ["--value"];
		const options = { value: z.union([z.literal(false), z.literal(true)]) };

		const actual = parseOptionsArgs(args, options);

		expect(actual.values).toEqual({ value: true });
	});

	test("optional string parsing success", () => {
		const args = ["--value", "abc"];
		const options = { value: z.string().optional() };

		const actual = parseOptionsArgs(args, options);

		expect(actual.values).toEqual({ value: "abc" });
	});

	test("default string parsing success", () => {
		const args = ["--value", "def"];
		const options = { value: z.string().default("abc") };

		const actual = parseOptionsArgs(args, options);

		expect(actual.values).toEqual({ value: "def" });
	});

	test("string parsing success", () => {
		const args = ["--value", "abc"];
		const options = { value: z.string() };

		const actual = parseOptionsArgs(args, options);

		expect(actual.values).toEqual({ value: "abc" });
	});

	test("string literal parsing success", () => {
		const args = ["--value", "abc"];
		const options = { value: z.literal("abc") };

		const actual = parseOptionsArgs(args, options);

		expect(actual.values).toEqual({ value: "abc" });
	});

	test("string literal union parsing success", () => {
		const args = ["--value", "b"];
		const options = { value: z.union([z.literal("a"), z.literal("b")]) };

		const actual = parseOptionsArgs(args, options);

		expect(actual.values).toEqual({ value: "b" });
	});

	test("enum parsing success", () => {
		const args = ["--value", "b"];
		const options = { value: z.enum(["a", "b"]) };

		const actual = parseOptionsArgs(args, options);

		expect(actual.values).toEqual({ value: "b" });
	});

	test("number parsing success", () => {
		const args = ["--value", "12"];
		const options = { value: z.number() };

		const actual = parseOptionsArgs(args, options);

		expect(actual.values).toEqual({ value: 12 });
	});

	test("number parsing failure", () => {
		const args = ["--value", "abc"];
		const options = { value: z.number() };

		const actual = parseOptionsArgs(args, options);

		expect(actual).toEqual({
			issues: [
				{
					flag: "value",
					message: '--value: Expected a number, received "abc".',
				},
			],
			unknown: {},
			values: {},
		});
	});

	test("object parsing success", () => {
		const args = ["--value", '{"a":1}'];
		const options = { value: z.object({ a: z.number() }) };

		const actual = parseOptionsArgs(args, options);

		expect(actual.values).toEqual({ value: { a: 1 } });
	});

	test("object parsing failure", () => {
		const args = ["--value", "{"];
		const options = { value: z.object({ a: z.number() }) };

		const actual = parseOptionsArgs(args, options);

		expect(actual).toEqual({
			issues: [
				{
					flag: "value",
					message: '--value: Expected valid JSON, received "{".',
				},
			],
			unknown: {},
			values: {},
		});
	});

	test("array parsing success", () => {
		const args = ["--value", "a", "--value", "b"];
		const options = { value: z.array(z.string()) };

		const actual = parseOptionsArgs(args, options);

		expect(actual.values).toEqual({ value: ["a", "b"] });
	});

	test("unprovided flags are left out", () => {
		const args = ["--provided", "abc"];
		const options = {
			notProvided: z.string().default("def"),
			notProvidedBoolean: z.boolean().optional(),
			notProvidedNumber: z.number().optional(),
			provided: z.string(),
		};

		const actual = parseOptionsArgs(args, options);

		expect(actual.values).toEqual({ provided: "abc" });
	});

	test("unknown flags are collected without being parsed as options", () => {
		const args = ["npx", "my-template", "--mode", "setup", "--offline", "-x"];
		const options = { value: z.string().optional() };

		const actual = parseOptionsArgs(args, options);

		expect(actual).toEqual({
			issues: [],
			unknown: { mode: true, offline: true, x: true },
			values: {},
		});
	});
});
