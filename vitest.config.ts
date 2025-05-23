import { readdirSync } from "node:fs";
import { coverageConfigDefaults, defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		coverage: {
			all: true,
			exclude: [
				...coverageConfigDefaults.exclude,
				"**/config.ts",
				"**/*.astro",
			],
			include: ["packages/*/src/"],
		},

		workspace: readdirSync("./packages").map((name) => ({
			test: {
				clearMocks: true,
				include: ["**/src/**/*.test.ts"],
				name,
				root: `./packages/${name}`,
				setupFiles: ["console-fail-test/setup"],
			},
		})),
	},
});
