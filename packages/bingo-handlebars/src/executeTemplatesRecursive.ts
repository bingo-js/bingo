import {
	CreatedDirectory,
	CreatedEntry,
	CreatedFileEntry,
	CreatedFileMetadata,
} from "bingo-fs";

import { executeTemplate } from "./executeTemplate.js";

export function executeTemplatesRecursive(
	source: CreatedFileEntry | undefined,
	options: object | undefined,
): CreatedFileEntry | undefined;
export function executeTemplatesRecursive(
	source: CreatedDirectory | undefined,
	options: object | undefined,
): CreatedDirectory | undefined;
export function executeTemplatesRecursive(
	source: CreatedEntry | undefined,
	options: object | undefined,
): CreatedEntry | undefined;
export function executeTemplatesRecursive(
	source: CreatedEntry | undefined,
	options: object | undefined,
): CreatedEntry | undefined {
	if (!source) {
		return source;
	}

	if (Array.isArray(source)) {
		const contents = executeTemplate(source[0], options);
		const metadata = source[1] && simplifyMetadata(source[1]);

		return metadata ? [contents, metadata] : contents;
	}

	return Object.fromEntries(
		Object.entries(source).map(([key, value]) => [
			key.replace(/\.hbs$/i, ""),
			executeTemplatesRecursive(value, options),
		]),
	);
}

function simplifyMetadata({
	executable,
	...rest
}: CreatedFileMetadata): CreatedFileMetadata | undefined {
	const simplified = executable ? { ...rest, executable } : rest;

	return Object.keys(simplified).length ? simplified : undefined;
}
