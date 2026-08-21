import { ParseArgsConfig } from "node:util";

// TODO: Send issue/PR to DefinitelyTyped to export these from node:util...
// https://github.com/bingo-js/bingo/issues/284

type ParseArgsOptionsConfig = NonNullable<ParseArgsConfig["options"]>;

export const cliArgsOptions = {
	directory: {
		type: "string",
	},
	help: {
		type: "boolean",
	},
	mode: {
		type: "string",
	},
	offline: {
		type: "boolean",
	},
	owner: {
		type: "string",
	},
	remote: {
		type: "boolean",
	},
	repository: {
		type: "string",
	},
	"skip-files": {
		type: "boolean",
	},
	"skip-requests": {
		type: "boolean",
	},
	"skip-scripts": {
		type: "boolean",
	},
	version: {
		type: "boolean",
	},
} satisfies ParseArgsOptionsConfig;
