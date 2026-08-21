import { CreatedEntry, CreatedFileEntry } from "bingo-fs";

export function mergeFileEntries(
	first: CreatedFileEntry | false | undefined,
	second: CreatedFileEntry | false | undefined,
	path: string[],
): CreatedFileEntry | undefined {
	if (first === second || isBlankEntry(second)) {
		return typeof first === "string" ? first : undefined;
	}

	if (isBlankEntry(first)) {
		return second;
	}

	const [firstFile, firstSettings] = Array.isArray(first) ? first : [first, {}];
	const [secondFile, secondSettings] = Array.isArray(second)
		? second
		: [second, {}];

	if (firstFile !== secondFile) {
		throw new Error(`Conflicting created files at path: '${path.join("/")}'.`);
	}

	const firstExecutable = !!firstSettings?.executable;
	const secondExecutable = !!secondSettings?.executable;

	if (firstExecutable !== secondExecutable) {
		throw new Error(
			`Conflicting created file executable at path: '${path.join("/")}'.`,
		);
	}

	return firstExecutable ? [firstFile, { executable: true }] : firstFile;
}

function isBlankEntry(entry: CreatedEntry | undefined) {
	return entry === false || entry === undefined;
}
