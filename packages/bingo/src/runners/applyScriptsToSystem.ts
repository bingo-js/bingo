import { CreatedScript } from "../types/creations.js";
import { SystemContext } from "../types/system.js";
import { groupBy } from "../utils/groupBy.js";

interface ScriptFailure extends Error {
	shortMessage?: string;
	stderr?: { toString(): string };
	stdout?: { toString(): string };
}

export async function applyScriptsToSystem(
	scripts: CreatedScript[],
	system: Pick<SystemContext, "display" | "runner">,
) {
	const scriptsByPhase = groupBy(
		scripts.filter((script) => typeof script === "object"),
		(script) => script.phase ?? Infinity,
	);
	const commandsStandalone = scripts.filter(
		(script) => typeof script === "string",
	);

	const phaseKeys = Object.keys(scriptsByPhase)
		.map((key) => Number(key))
		.sort();

	async function runCommand(command: string, silent?: boolean) {
		system.display.item("script", command, { start: Date.now() });
		const result = await system.runner(command, { colors: true });
		system.display.item("script", command, { end: Date.now() });

		if (result instanceof Error && !silent) {
			system.display.item("script", command, { error: getScriptError(result) });
		}
	}

	const commandsStandaloneTask = Promise.all(
		commandsStandalone.map(async (command) => {
			await runCommand(command);
		}),
	);

	for (const phase of phaseKeys) {
		await Promise.all(
			scriptsByPhase[phase].map(async (script) => {
				for (const command of script.commands) {
					await runCommand(command, script.silent);
				}
			}),
		);
	}

	await commandsStandaloneTask;
}

// execa strips ANSI sequences out of error.message, so the command's own output
// has to be read from the raw streams for its colors to survive.
function getScriptError(error: ScriptFailure) {
	const output = [
		error.shortMessage,
		error.stderr?.toString(),
		error.stdout?.toString(),
	]
		.filter((part) => !!part)
		.join("\n\n");

	return output || error;
}
