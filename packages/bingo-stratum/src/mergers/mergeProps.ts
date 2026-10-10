import hashObject from "hash-object";

import { BlockWithProps } from "../types/blocks.js";
import { CreatedBlockExtension } from "../types/creations.js";
import { createBlockExtension } from "../utils/createBlockExtension.js";

export function mergeExtensions<Options extends object | unknown[]>(
	first: CreatedBlockExtension<object, Options>[],
	second: CreatedBlockExtension<object, Options>[],
): CreatedBlockExtension<object, Options>[] {
	const byBlock = new Map<
		BlockWithProps<object, Options>,
		object | unknown[]
	>();

	for (const { block, props } of [...first, ...second]) {
		const merged = mergeBlockProps(byBlock.get(block), props);

		if (isNotNullish(merged)) {
			byBlock.set(block, merged);
		}
	}

	return Array.from(byBlock).map(([block, props]) =>
		createBlockExtension(block, props, block.about?.name),
	);
}

function isNotNullish(value: unknown) {
	return value != null;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
	return !!value && typeof value === "object" && !Array.isArray(value);
}

function mergeBlockPropArrays(firsts: unknown[], seconds: unknown[]) {
	const firstNonNullish = firsts.filter(isNotNullish);
	const secondNonNullish = seconds.filter(isNotNullish);

	return mergeBlockPropArraysNonNullish(firstNonNullish, secondNonNullish);
}

function mergeBlockPropArraysNonNullish(firsts: unknown[], seconds: unknown[]) {
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

function mergeBlockProps(first: unknown, second: unknown): unknown {
	if (Array.isArray(first) && Array.isArray(second)) {
		return mergeBlockPropArrays(first, second);
	}

	if (isPlainObject(first) && isPlainObject(second)) {
		const merged: Record<string, unknown> = { ...first };

		for (const [key, value] of Object.entries(second)) {
			merged[key] = mergeBlockProps(first[key], value);
		}

		return merged;
	}

	return first ?? second;
}
