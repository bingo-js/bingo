import * as fs from "node:fs/promises";

import { ReadingFileSystem } from "./types.js";

export function createReadingFileSystem(): ReadingFileSystem {
	return {
		glob: async (patterns: string | string[]) =>
			await collect(fs.glob(patterns)),
		readDirectory: async (filePath: string) => await fs.readdir(filePath),
		readFile: async (filePath: string) =>
			(await fs.readFile(filePath)).toString(),
	};
}

async function collect(matches: AsyncIterable<string>) {
	const collected: string[] = [];

	for await (const match of matches) {
		collected.push(match);
	}

	return collected;
}
