import { describe, expect, it } from "vitest";
import { z } from "zod";

import { getSchemaDefaultValue } from "./getSchemaDefaultValue.js";

describe(getSchemaDefaultValue, () => {
	it("returns undefined when the schema has no default", () => {
		const actual = getSchemaDefaultValue(z.string());

		expect(actual).toBeUndefined();
	});

	it("returns the default value when the schema has one", () => {
		const actual = getSchemaDefaultValue(z.string().default("abc"));

		expect(actual).toBe("abc");
	});

	it("returns the resolved value when the schema has a lazy default", () => {
		const actual = getSchemaDefaultValue(z.string().default(() => "abc"));

		expect(actual).toBe("abc");
	});
});
