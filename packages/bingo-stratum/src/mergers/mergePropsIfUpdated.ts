import hashObject from "hash-object";
import { inspect } from "node:util";

export function mergePropsIfUpdated<T extends object>(
	existingProps: T,
	newProps: T,
	path: string[] = [],
): Error | T | undefined {
	if (Array.isArray(existingProps)) {
		if (!Array.isArray(newProps)) {
			return createMismatchError(path, existingProps, newProps);
		}
		return mergePropArraysIfUpdated(existingProps, newProps) as T;
	} else if (Array.isArray(newProps)) {
		return createMismatchError(path, existingProps, newProps);
	}

	const newEntries = Object.entries(newProps) as [keyof T, unknown][];
	const result = { ...existingProps };
	let updated = newEntries.length !== Object.keys(existingProps).length;

	for (const [key, value] of newEntries) {
		const keyPath = [...path, key as string];

		if (!(key in result) || result[key] == null) {
			updated = true;
			result[key] = value as T[keyof T];
			continue;
		}

		if (value == null) {
			continue;
		}

		if (Array.isArray(result[key])) {
			if (!Array.isArray(value)) {
				return createMismatchError(keyPath, result[key], value);
			}

			const existingElementKeys = new Set(
				result[key].map((value) => createHash(value)),
			);

			for (const newElement of value) {
				const newElementKey = createHash(newElement);
				if (!existingElementKeys.has(newElementKey)) {
					existingElementKeys.add(newElementKey);
					result[key].push(newElement);
					updated = true;
				}
			}

			continue;
		}

		if (typeof result[key] === "object") {
			if (typeof value !== "object") {
				return createMismatchError(keyPath, result[key], value);
			}

			const nestedMerge = mergePropsIfUpdated(result[key], value, keyPath);
			if (nestedMerge) {
				if (nestedMerge instanceof Error) {
					return nestedMerge;
				}

				result[key] = nestedMerge as T[keyof T];
				updated = true;
			}

			continue;
		}

		if (result[key] !== value) {
			return createMismatchError(keyPath, result[key], value);
		}
	}

	return updated ? result : undefined;
}

function createHash(value: unknown) {
	return typeof value === "object"
		? hashObject(value as Record<string, unknown>)
		: String(value as boolean | null | number | string | undefined);
}

function createMismatchError(
	path: string[],
	existingValue: unknown,
	newValue: unknown,
) {
	const location = path.length ? ` at '${path.join(".")}'` : "";
	const existing = inspect(existingValue, { breakLength: Infinity });
	const updated = inspect(newValue, { breakLength: Infinity });

	return new Error(
		`Mismatched props${location}: existing ${existing} vs. new ${updated}.`,
	);
}

function mergePropArraysIfUpdated<T extends object>(
	existingProps: T[],
	newProps: T[],
) {
	const result = [...existingProps];
	const hashes = new Set(existingProps.map(createHash));
	let updated = false;

	for (const newProp of newProps) {
		const newHash = createHash(newProp);
		if (hashes.has(newHash)) {
			continue;
		}

		hashes.add(newHash);
		result.push(newProp);
		updated = true;
	}

	return updated ? result : undefined;
}
