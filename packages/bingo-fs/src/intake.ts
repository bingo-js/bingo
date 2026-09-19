import { Stats } from "node:fs";
import * as fs from "node:fs/promises";
import path from "node:path";

import { isModeExecutable } from "./isModeExecutable.js";
import { IntakeDirectory, IntakeEntry } from "./types.js";

/**
 * Optional settings to read in directories and files to a bingo-fs representation.
 * @see {@link https://www.create.bingo/build/packages/bingo-fs#intake}
 */
export interface IntakeSettings {
	exclude?: RegExp;
}

/**
 * Reads in directories and files to a bingo-fs representation.
 * @param rootPath Path on disk to start read from.
 * @param settings Optional settings to modify reading.
 * @returns A representation of the directory or file, or undefined if it didn't exist.
 * @see {@link https://www.create.bingo/build/packages/bingo-fs#intake}
 */
export async function intake(rootPath: string, settings: IntakeSettings = {}) {
	let stats: Stats;
	try {
		stats = await fs.stat(rootPath);
	} catch {
		return undefined;
	}

	return stats.isDirectory()
		? await intakeDirectory(rootPath, settings)
		: await intakeFile(rootPath, stats.mode);
}

export async function intakeDirectory(
	directoryPath: string,
	settings?: IntakeSettings,
): Promise<IntakeDirectory> {
	const directory: IntakeDirectory = {};
	const children = await fs.readdir(directoryPath);

	for (const child of children) {
		if (!settings?.exclude?.test(child)) {
			directory[child] = await intake(
				path.join(directoryPath, child),
				settings,
			);
		}
	}

	return directory;
}

async function intakeFile(
	filePath: string,
	mode?: number,
): Promise<IntakeEntry> {
	const contents = (await fs.readFile(filePath)).toString();

	// Windows file modes don't include executable bits, so there's no way to
	// know whether a file is executable: leave the metadata unspecified.
	// https://github.com/bingo-js/bingo/issues/419
	if (process.platform === "win32") {
		return [contents];
	}

	return [
		contents,
		{ executable: isModeExecutable(mode ?? (await fs.stat(filePath)).mode) },
	];
}
