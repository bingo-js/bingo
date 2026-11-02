import type { KnipConfig } from "knip";

const config: KnipConfig = {
	ignoreExportsUsedInFile: { interface: true, type: true },
	workspaces: {
		".": {
			ignoreDependencies: ["@changesets/cli"],
		},
		"packages/bingo": {
			project: ["src/**/*.ts!"],
		},
		"packages/bingo-testers": {
			project: ["src/**/*.ts!"],
		},
		"packages/site": {
			entry: ["src/components/*.astro"],
		},
	},
};

export default config;
