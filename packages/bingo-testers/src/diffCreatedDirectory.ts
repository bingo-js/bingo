import { diffStringsUnified } from "@vitest/utils/diff";
import { CreatedDirectory, CreatedEntry, CreatedFileMetadata } from "bingo-fs";
import path from "node:path";
import c from "tinyrainbow";
import { withoutUndefinedProperties } from "without-undefined-properties";

export interface DiffCreatedDirectoryOptions {
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

export type ProcessText = (
	text: string,
	filePath: string,
) => Promise<string> | string;

export async function diffCreatedDirectory(
	actual: CreatedDirectory,
	created: CreatedDirectory,
	{ processText = (text) => text }: DiffCreatedDirectoryOptions = {},
): Promise<DiffedCreatedDirectory | undefined> {
	const result = await diffCreatedDirectoryWorker(
		actual,
		created,
		".",
		processText,
	);

	return result && withoutUndefinedProperties(result);
}

async function diffCreatedDirectoryChild(
	childActual: CreatedEntry | undefined,
	childCreated: CreatedEntry | undefined,
	pathToChild: string,
	processText: ProcessText,
): Promise<DiffedCreatedFileEntry | undefined> {
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
				processText,
			);
		}
	}

	if (Array.isArray(childActual)) {
		if (Array.isArray(childCreated)) {
			const fileDiff = await diffCreatedFileText(
				childActual[0],
				childCreated[0],
				pathToChild,
				processText,
			);
			const optionsDiff = await diffCreatedFileMetadata(
				childActual[1],
				childCreated[1],
				pathToChild,
			);

			return (fileDiff ?? optionsDiff) ? [fileDiff, optionsDiff] : undefined;
		}

		if (typeof childCreated === "string") {
			return diffCreatedFileText(
				childActual[0],
				childCreated,
				pathToChild,
				processText,
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
				processText,
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
				processText,
			);
		}
	}

	return `Mismatched ${pathToChild}: actual is ${typeof childActual}; created is ${typeof childCreated}.`;
}

async function diffCreatedDirectoryWorker(
	actual: CreatedDirectory,
	created: CreatedDirectory,
	pathTo: string,
	processText: ProcessText,
): Promise<DiffedCreatedDirectory | undefined> {
	const result: DiffedCreatedDirectory = {};

	for (const [childName, childCreated] of Object.entries(created)) {
		if (!(childName in actual)) {
			result[childName] = undefinedIfEmpty(childCreated);
			continue;
		}

		const childActual = actual[childName];
		const pathToChild = path.join(pathTo, childName);

		const childDiffed = await diffCreatedDirectoryChild(
			childActual,
			childCreated,
			pathToChild,
			processText,
		);

		if (childDiffed !== undefined) {
			result[childName] = childDiffed;
		}
	}

	return undefinedIfEmpty(withoutUndefinedProperties(result));
}

async function diffCreatedFileMetadata(
	actual: CreatedFileMetadata | undefined,
	created: CreatedFileMetadata | undefined,
	pathToFile: string,
): Promise<DiffedCreatedFileMetadata | undefined> {
	if (
		actual?.executable === undefined ||
		created?.executable === undefined ||
		actual.executable === created.executable
	) {
		return undefined;
	}

	return {
		executable: await diffCreatedFileText(
			actual.executable.toString(),
			created.executable.toString(),
			pathToFile,
			(text) => text,
		),
	};
}

async function diffCreatedFileText(
	actual: string,
	created: string,
	pathToFile: string,
	processText: ProcessText,
): Promise<string | undefined> {
	const actualProcessed = await processText(actual, pathToFile);
	const createdProcessed = await processText(created, pathToFile);

	return actualProcessed === createdProcessed
		? undefined
		: diffStringsUnified(actualProcessed, createdProcessed, {
				aColor: c.red,
				bColor: c.green,
				omitAnnotationLines: true,
			});
}
function undefinedIfEmpty<T>(value: T) {
	return !!value &&
		typeof value === "object" &&
		!Array.isArray(value) &&
		Object.keys(value).length === 0
		? undefined
		: value;
}
