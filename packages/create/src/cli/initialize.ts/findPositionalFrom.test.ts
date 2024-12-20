import { describe, expect, it, test, vi } from "vitest";

import { findPositionalFrom } from "./findPositionalFrom.js";

describe("findPositionalFrom", () => {
	test.each([
		[["/bin/node"], undefined],
		[["/bin/node", "create"], undefined],
		[["/bin/node", "create", "create-my-app"], "create-my-app"],
		[["/bin/node", "create", "my-app"], "create-my-app"],
		[["/bin/node", "create", "/create-my-app"], "/create-my-app"],
		[["/bin/node", "create", "/my-app"], "/my-app"],
		[["/bin/node", "create", "./create-my-app"], "./create-my-app"],
		[["/bin/node", "create", "./my-app"], "./my-app"],
	])("%j", (input, expected) => {
		expect(findPositionalFrom(input)).toBe(expected);
	});
});
