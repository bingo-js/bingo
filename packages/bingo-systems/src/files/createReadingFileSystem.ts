import * as fs from "node:fs/promises";
import { glob } from "tinyglobby";

import { ReadingFileSystem } from "./types.js";

export function createReadingFileSystem(): ReadingFileSystem {
	return {
		glob: async (patterns: string | string[]) => await glob(patterns),
		readDirectory: async (filePath: string) => await fs.readdir(filePath),
		readFile: async (filePath: string) =>
			(await fs.readFile(filePath)).toString(),
	};
}
