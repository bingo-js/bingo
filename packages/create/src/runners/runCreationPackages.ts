import { CreationContextWithoutOptions } from "../types/context.js";
import { CreatedPackages } from "../types/creations.js";

export async function runCreationPackages(
	packages: CreatedPackages,
	context: CreationContextWithoutOptions,
) {
	for (const [key, suffix] of [
		["dependencies", ""],
		["devDependencies", " --save-dev"],
		["peerDependencies", " --save-peer"],
	] as const) {
		if (!packages[key]) {
			continue;
		}

		const args = Object.entries(packages[key])
			.map((pair) => pair.join("@"))
			.join(" ");

		await context.runner(`pnpm add ${args}${suffix}`);
	}
}
