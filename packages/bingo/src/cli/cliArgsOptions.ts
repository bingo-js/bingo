import { ParseArgsOptionsConfig } from "node:util";

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
