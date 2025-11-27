#!/usr/bin/env node

import { styleText } from "node:util";

console.log(
	[
		styleText("red", "❌ You just ran "),
		styleText(["bold", "red"], `npx create`),
		styleText(
			"red",
			", which installs and run this npm package named 'create'.",
		),
	].join(""),
);

console.log(
	[
		styleText("yellow", "You likely want "),
		styleText(["bold", "yellow"], `npm create`),
		styleText(
			"yellow",
			", the built-in npm command to install and run a package with a name like 'create-*'.",
		),
	].join(""),
);

console.log(
	styleText("yellow", "See: https://docs.npmjs.com/cli/commands/npm-init"),
);
