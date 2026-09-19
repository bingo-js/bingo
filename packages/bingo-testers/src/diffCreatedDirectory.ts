import { CreatedDirectory, CreatedEntry, CreatedFileMetadata } from "bingo-fs";
import { Change, createTwoFilesPatch, diffWordsWithSpace } from "diff";
import path from "node:path";
import { styleText } from "node:util";
import { withoutUndefinedProperties } from "without-undefined-properties";

export interface DiffCreatedDirectoryOptions {
	/**
	 * Whether to add ANSI colors to file diffs, highlighting changed segments within lines.
	 * @default false
	 */
	colors?: boolean;

	/**
	 * Transforms each file's text before comparing, such as to normalize formatting.
	 * @default (text) => text
	 */
	processText?: ProcessText;
}

export interface DiffedCreatedDirectory {
	[i: string]: DiffedCreatedDirectory | DiffedCreatedFileEntry | undefined;
}

export type DiffedCreatedFileEntry =
	| [string]
	| [string | undefined, DiffedCreatedFileMetadata?]
	| CreatedEntry
	| DiffedCreatedDirectory
	| string;

export interface DiffedCreatedFileMetadata {
	executable?: string;
}

export type ProcessText = (text: string, filePath: string) => string;

interface DiffSettings {
	colors: boolean;
	processText: ProcessText;
}

type Style = Parameters<typeof styleText>[0];

// Highlighting segments within a pair of long, mostly different lines can be
// slow. It's not helpful for those lines anyway, so it's skipped after this long.
const highlightTimeoutMs = 100;

export function diffCreatedDirectory(
	actual: CreatedDirectory,
	created: CreatedDirectory,
	options: DiffCreatedDirectoryOptions | ProcessText = {},
): DiffedCreatedDirectory | undefined {
	const { colors = false, processText = (text: string) => text } =
		typeof options === "function" ? { processText: options } : options;

	const result = diffCreatedDirectoryWorker(actual, created, ".", {
		colors,
		processText,
	});

	return result && withoutUndefinedProperties(result);
}

/**
 * Colors are applied unconditionally rather than detected from the terminal:
 * test runners generally run test files in workers whose stdout isn't a TTY.
 */
function color(style: Style, text: string) {
	return styleText(style, text, { validateStream: false });
}

/**
 * Collects indices of consecutive lines starting with the prefix, skipping over
 * any "\ No newline at end of file" markers in between.
 */
function collectDiffLineRun(lines: string[], start: number, prefix: string) {
	const indices: number[] = [];

	for (let i = start; i < lines.length; i++) {
		if (lines[i].startsWith(prefix)) {
			indices.push(i);
		} else if (!lines[i].startsWith("\\")) {
			break;
		}
	}

	return indices;
}

/**
 * Joins the changes belonging to one side of a diff, with an inverse color on
 * the segments that are unique to that side.
 */
function colorizeChanges(changes: Change[], side: "added" | "removed") {
	return changes
		.filter((change) => change[side] || !(change.added || change.removed))
		.map((change) =>
			change[side] ? color("inverse", change.value) : change.value,
		)
		.join("");
}

function colorizeDiff(patch: string) {
	const lines = patch.split("\n");
	const colorized = lines.map(colorizeDiffLine);

	// Each run of removed lines directly followed by a run of added lines is
	// paired up line-by-line, so that changed segments within each pair can be
	// highlighted. Any unpaired lines keep their whole-line color.
	for (let i = 0; i < lines.length; i++) {
		if (!lines[i].startsWith("-")) {
			continue;
		}

		const removed = collectDiffLineRun(lines, i, "-");
		const added = collectDiffLineRun(
			lines,
			removed[removed.length - 1] + 1,
			"+",
		);

		for (let j = 0; j < Math.min(removed.length, added.length); j++) {
			[colorized[removed[j]], colorized[added[j]]] = colorizeDiffLinePair(
				lines[removed[j]],
				lines[added[j]],
			);
		}

		i = added.length ? added[added.length - 1] : removed[removed.length - 1];
	}

	return colorized.join("\n");
}

function colorizeDiffLine(line: string) {
	switch (line[0]) {
		case "+":
			return color("green", line);
		case "-":
			return color("red", line);
		case "@":
			return color("cyan", line);
		case "\\":
			return color("dim", line);
		default:
			return line;
	}
}

function colorizeDiffLinePair(removed: string, added: string) {
	const changes = diffWordsWithSpace(removed.slice(1), added.slice(1), {
		timeout: highlightTimeoutMs,
	});

	return changes
		? [
				color("red", "-" + colorizeChanges(changes, "removed")),
				color("green", "+" + colorizeChanges(changes, "added")),
			]
		: [colorizeDiffLine(removed), colorizeDiffLine(added)];
}

function diffCreatedDirectoryChild(
	childActual: CreatedEntry | undefined,
	childCreated: CreatedEntry | undefined,
	pathToChild: string,
	settings: DiffSettings,
): DiffedCreatedFileEntry | undefined {
	if (childActual === undefined) {
		return childCreated;
	}

	if (childCreated === undefined) {
		return undefined;
	}

	if (typeof childActual === "string") {
		if (typeof childCreated === "string") {
			return diffCreatedFileText(
				childActual,
				childCreated,
				pathToChild,
				settings,
			);
		}
	}

	if (Array.isArray(childActual)) {
		if (Array.isArray(childCreated)) {
			const fileDiff = diffCreatedFileText(
				childActual[0],
				childCreated[0],
				pathToChild,
				settings,
			);
			const optionsDiff = diffCreatedFileMetadata(
				childActual[1],
				childCreated[1],
				pathToChild,
				settings,
			);

			return (fileDiff ?? optionsDiff) ? [fileDiff, optionsDiff] : undefined;
		}

		if (typeof childCreated === "string") {
			return diffCreatedFileText(
				childActual[0],
				childCreated,
				pathToChild,
				settings,
			);
		}

		return `Mismatched ${pathToChild}: actual is created file; created is ${typeof childCreated}.`;
	}

	if (Array.isArray(childCreated)) {
		if (typeof childActual === "string") {
			return diffCreatedFileText(
				childActual,
				childCreated[0],
				pathToChild,
				settings,
			);
		}

		return `Mismatched ${pathToChild}: actual is ${typeof childActual}; created is created file.`;
	}

	if (typeof childActual === "object") {
		if (typeof childCreated === "object") {
			return diffCreatedDirectoryWorker(
				childActual,
				childCreated,
				pathToChild,
				settings,
			);
		}
	}

	return `Mismatched ${pathToChild}: actual is ${typeof childActual}; created is ${typeof childCreated}.`;
}

function diffCreatedDirectoryWorker(
	actual: CreatedDirectory,
	created: CreatedDirectory,
	pathTo: string,
	settings: DiffSettings,
): DiffedCreatedDirectory | undefined {
	const result: DiffedCreatedDirectory = {};

	for (const [childName, childCreated] of Object.entries(created)) {
		if (!(childName in actual)) {
			result[childName] = undefinedIfEmpty(childCreated);
			continue;
		}

		const childActual = actual[childName];
		const pathToChild = path.join(pathTo, childName);

		const childDiffed = diffCreatedDirectoryChild(
			childActual,
			childCreated,
			pathToChild,
			settings,
		);

		if (childDiffed !== undefined) {
			result[childName] = childDiffed;
		}
	}

	return undefinedIfEmpty(withoutUndefinedProperties(result));
}

function diffCreatedFileMetadata(
	actual: CreatedFileMetadata | undefined,
	created: CreatedFileMetadata | undefined,
	pathToFile: string,
	{ colors }: DiffSettings,
): DiffedCreatedFileMetadata | undefined {
	if (
		actual?.executable === undefined ||
		created?.executable === undefined ||
		actual.executable === created.executable
	) {
		return undefined;
	}

	return {
		executable: diffText(
			actual.executable.toString(),
			created.executable.toString(),
			pathToFile,
			colors,
		),
	};
}

function diffCreatedFileText(
	actual: string,
	created: string,
	pathToFile: string,
	{ colors, processText }: DiffSettings,
) {
	return diffText(
		processText(actual, pathToFile),
		processText(created, pathToFile),
		pathToFile,
		colors,
	);
}

function diffText(
	actual: string,
	created: string,
	pathToFile: string,
	colors: boolean,
) {
	if (actual === created) {
		return undefined;
	}

	const patch = createTwoFilesPatch(
		pathToFile,
		pathToFile,
		actual,
		created,
	).replace(/^Index: .+\n=+\n-{3} .+\n\+{3} .+\n/gmu, "");

	return colors ? colorizeDiff(patch) : patch;
}

function undefinedIfEmpty<T>(value: T) {
	return !!value &&
		typeof value === "object" &&
		!Array.isArray(value) &&
		Object.keys(value).length === 0
		? undefined
		: value;
}
