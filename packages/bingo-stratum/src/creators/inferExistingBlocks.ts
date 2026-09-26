import {
	AnyShape,
	InferredObject,
	mergeCreations,
	TemplatePrepareContext,
} from "bingo";
import { CreatedDirectory, CreatedEntry } from "bingo-fs";
import { Options } from "hash-object";

import {
	produceBlock,
	ProduceBlockSettings,
} from "../producers/produceBlock.js";
import { Block } from "../types/blocks.js";
import { Preset } from "../types/presets.js";
import { StratumTemplate } from "../types/templates.js";
import { slugifyName } from "../utils/slugifyName.js";

export function inferExistingBlocks<OptionsShape extends AnyShape, Refinements>(
	context: Pick<
		TemplatePrepareContext<Partial<InferredObject<OptionsShape>>, Refinements>,
		"files" | "options"
	>,
	template: StratumTemplate<OptionsShape>,
) {
	const files = applyLegacyFiles(context.files, template.blocks);
	const blockSettings: ProduceBlockSettings<undefined, Options> = {
		...context,

		// TODO: It would be better to run the base.prepare first to generate option defaults.
		// https://github.com/bingo-js/bingo/issues/289
		options: context.options as Options,
	};

	let record: undefined | { percentage: number; preset: Preset<OptionsShape> };

	const existingProductions = new Map(
		template.blocks.map((block) => {
			try {
				return [
					block,
					produceBlock(block as Block<undefined, Options>, blockSettings),
				];
			} catch {
				return [block, {}];
			}
		}),
	);

	for (const preset of template.presets) {
		const existingPresetProduction = preset.blocks
			.map((block) => existingProductions.get(block))
			.filter((x) => !!x)
			.reduce(mergeCreations, {});
		const counted = countMatchedFilePaths(
			files,
			existingPresetProduction.files,
		);
		const percentage = counted.matched / counted.created;

		if (record) {
			if (percentage > record.percentage) {
				record = { percentage, preset };
			}
		} else {
			record = { percentage, preset };
		}
	}

	const existingPreset =
		record && record.percentage >= 0.35 ? record.preset : undefined;

	if (!existingPreset) {
		return {};
	}

	const existingBlocks = Array.from(existingProductions)
		.filter(([, production]) => {
			const counted = countMatchedFilePaths(files, production.files);

			return !!counted.matched && !counted.missed;
		})
		.map(([block]) => block);

	const blocksInPreset = new Set(existingPreset.blocks);

	return {
		blocks: existingBlocks.filter((block) => !blocksInPreset.has(block)),
		preset: slugifyName(existingPreset.about.name),
	};
}

/**
 * Moves any files on disk at Blocks' legacy paths to their current paths,
 * so they're treated as matches for the files Blocks now produce.
 */
function applyLegacyFiles(
	files: CreatedDirectory | undefined,
	blocks: Pick<Block<undefined, Options>, "legacyFiles">[],
) {
	if (!files) {
		return files;
	}

	let result = files;

	for (const block of blocks) {
		for (const [legacyPath, currentPath] of Object.entries(
			block.legacyFiles ?? {},
		)) {
			const legacyFile = getEntry(result, legacyPath);

			if (!isCreatedFile(legacyFile) || getEntry(result, currentPath)) {
				continue;
			}

			result = setEntry(
				setEntry(result, legacyPath, undefined),
				currentPath,
				legacyFile,
			);
		}
	}

	return result;
}

function countMatchedFilePaths(
	created: CreatedEntry | undefined,
	produced: CreatedEntry | undefined,
) {
	const found = {
		created: 0,
		matched: 0,
		missed: 0,
	};

	const queue: [CreatedEntry | undefined, CreatedEntry | undefined][] = [
		[created, produced],
	];

	while (queue.length) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const [currentCreated, currentProduced] = queue.pop()!;

		if (isCreatedFile(currentCreated)) {
			found.created += 1;

			if (isCreatedFile(currentProduced)) {
				found.matched += 1;
			}

			continue;
		} else if (isCreatedFile(currentProduced)) {
			found.missed += 1;
		}

		if (
			isCreatedDirectory(currentCreated) &&
			isCreatedDirectory(currentProduced)
		) {
			for (const key of new Set([
				...Object.keys(currentCreated),
				...Object.keys(currentProduced),
			])) {
				queue.push([currentCreated[key], currentProduced[key]]);
			}
		}
	}

	return found;
}

function getEntry(directory: CreatedDirectory, filePath: string) {
	let entry: CreatedEntry | undefined = directory;

	for (const part of filePath.split("/")) {
		if (!isCreatedDirectory(entry)) {
			return undefined;
		}

		entry = entry[part];
	}

	return entry;
}

function isCreatedDirectory(
	entry: CreatedEntry | undefined,
): entry is CreatedDirectory {
	return !!entry && typeof entry === "object" && !Array.isArray(entry);
}

function isCreatedFile(entry: CreatedEntry | undefined) {
	return typeof entry === "string" || Array.isArray(entry);
}

function setEntry(
	directory: CreatedDirectory,
	filePath: string,
	value: CreatedEntry | undefined,
): CreatedDirectory {
	const [part, ...rest] = filePath.split("/");

	if (!rest.length) {
		return { ...directory, [part]: value };
	}

	const child = directory[part];

	return {
		...directory,
		[part]: setEntry(
			isCreatedDirectory(child) ? child : {},
			rest.join("/"),
			value,
		),
	};
}
