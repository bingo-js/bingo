import hashObject from "hash-object";

import { BlockWithAddons } from "../types/blocks.js";
import { CreatedBlockAddons } from "../types/creations.js";
import { createBlockAddons } from "../utils/createBlockAddons.js";

export function mergeAddons<Options extends object | unknown[]>(
	first: CreatedBlockAddons<object, Options>[],
	second: CreatedBlockAddons<object, Options>[],
): CreatedBlockAddons<object, Options>[] {
	const byBlock = new Map<
		BlockWithAddons<object, Options>,
		object | unknown[]
	>();

	for (const { addons, block } of [...first, ...second]) {
		const merged = mergeBlockAddons(byBlock.get(block), addons);

		if (isNotNullish(merged)) {
			byBlock.set(block, merged);
		}
	}

	return Array.from(byBlock).map(([block, addons]) =>
		createBlockAddons(addons, block, block.about?.name),
	);
}

function isNotNullish(value: unknown) {
	return value != null;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
	return !!value && typeof value === "object" && !Array.isArray(value);
}

function mergeBlockAddonArrays(firsts: unknown[], seconds: unknown[]) {
	const firstNonNullish = firsts.filter(isNotNullish);
	const secondNonNullish = seconds.filter(isNotNullish);

	return mergeBlockAddonArraysNonNullish(firstNonNullish, secondNonNullish);
}

function mergeBlockAddonArraysNonNullish(
	firsts: unknown[],
	seconds: unknown[],
) {
	const seen = new Set<unknown>();

	return [...firsts, ...seconds].filter((value) => {
		const identity =
			value && typeof value === "object" ? hashObject(value) : value;

		if (seen.has(identity)) {
			return false;
		}

		seen.add(identity);
		return true;
	});
}

function mergeBlockAddons(first: unknown, second: unknown): unknown {
	if (Array.isArray(first) && Array.isArray(second)) {
		return mergeBlockAddonArrays(first, second);
	}

	if (isPlainObject(first) && isPlainObject(second)) {
		const merged: Record<string, unknown> = { ...first };

		for (const [key, value] of Object.entries(second)) {
			merged[key] = mergeBlockAddons(first[key], value);
		}

		return merged;
	}

	return first ?? second;
}
