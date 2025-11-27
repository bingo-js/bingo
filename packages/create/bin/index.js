#!/usr/bin/env node

import pc from "picocolors";

console.error(
	[
		pc.red("❌ You just ran "),
		pc.red(pc.bold(`npx create`)),
		pc.red(", which installs and run this npm package named 'create'."),
	].join(""),
);

console.warn(
	[
		pc.yellow("You likely want "),
		pc.yellow(pc.bold(`npm create`)),
		pc.yellow(
			", the built-in npm command to install and run a package with a name like 'create-*'.",
		),
	].join(""),
);

console.warn(pc.yellow("See: https://docs.npmjs.com/cli/commands/npm-init"));
