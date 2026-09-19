import hashObject from "hash-object";
import { inspect } from "node:util";

export function mergeAddonsIfUpdated<T extends object>(
	existingAddons: T,
	newAddons: T,
	path: string[] = [],
): Error | T | undefined {
	if (Array.isArray(existingAddons)) {
		if (!Array.isArray(newAddons)) {
			return createMismatchError(path, existingAddons, newAddons);
		}
		return mergeAddonsArraysIfUpdated(existingAddons, newAddons) as T;
	} else if (Array.isArray(newAddons)) {
		return createMismatchError(path, existingAddons, newAddons);
	}

	const newEntries = Object.entries(newAddons) as [keyof T, unknown][];
	const result = { ...existingAddons };
	let updated = newEntries.length !== Object.keys(existingAddons).length;

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

			const nestedMerge = mergeAddonsIfUpdated(result[key], value, keyPath);
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
		`Mismatched addons${location}: existing ${existing} vs. new ${updated}.`,
	);
}

function mergeAddonsArraysIfUpdated<T extends object>(
	existingAddons: T[],
	newAddons: T[],
) {
	const result = [...existingAddons];
	const hashes = new Set(existingAddons.map(createHash));
	let updated = false;

	for (const newAddon of newAddons) {
		const newHash = createHash(newAddon);
		if (hashes.has(newHash)) {
			continue;
		}

		hashes.add(newHash);
		result.push(newAddon);
		updated = true;
	}

	return updated ? result : undefined;
}
