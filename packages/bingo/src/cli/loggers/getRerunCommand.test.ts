import { afterEach, describe, expect, it, vi } from "vitest";

import { getRerunCommand } from "./getRerunCommand.js";

describe("getRerunCommand", () => {
	afterEach(() => {
		vi.unstubAllEnvs();
	});

	it.each([
		[undefined, "npx my-app"],
		["", "npx my-app"],
		["npm/10.9.2 node/v22.14.0 darwin arm64 workspaces/false", "npx my-app"],
		["pnpm/10.12.1 npm/? node/v22.14.0 darwin arm64", "pnpm dlx my-app"],
		["yarn/1.22.22 npm/? node/v22.14.0 darwin arm64", "npx my-app"],
		["yarn/4.9.2 npm/? node/v22.14.0 darwin arm64", "yarn dlx my-app"],
		["bun/1.2.15 npm/? node/v24.3.0 darwin arm64", "bunx my-app"],
	])("when the user agent is %j, returns %j", (userAgent, expected) => {
		vi.stubEnv("npm_config_user_agent", userAgent);

		expect(getRerunCommand("my-app")).toBe(expected);
	});
});
