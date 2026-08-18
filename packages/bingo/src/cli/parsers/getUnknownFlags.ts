import { AnyShape } from "../../types/shapes.js";
import { cliArgsOptions } from "../cliArgsOptions.js";

export interface UnknownFlag {
	flag: string;
	suggestion?: string;
}

export function getUnknownFlags(
	values: object,
	optionsShape: AnyShape,
): UnknownFlag[] {
	const knownFlags = [
		...Object.keys(cliArgsOptions),
		...Object.keys(optionsShape),
	];
	const knownFlagsSet = new Set(knownFlags);

	return Object.keys(values)
		.filter((flag) => !knownFlagsSet.has(flag))
		.map((flag) => ({
			flag,
			suggestion: getClosestFlag(flag, knownFlags),
		}));
}

function getClosestFlag(flag: string, knownFlags: string[]) {
	const maximumDistance = Math.max(1, Math.floor(flag.length / 2));
	let closest: string | undefined;
	let closestDistance = Infinity;

	for (const knownFlag of knownFlags) {
		const distance = getEditDistance(flag, knownFlag);

		if (distance <= maximumDistance && distance < closestDistance) {
			closest = knownFlag;
			closestDistance = distance;
		}
	}

	return closest;
}

function getEditDistance(left: string, right: string) {
	let previous = Array.from({ length: right.length + 1 }, (_, i) => i);

	for (let i = 1; i <= left.length; i += 1) {
		const current = [i];

		for (let j = 1; j <= right.length; j += 1) {
			current[j] = Math.min(
				previous[j] + 1,
				current[j - 1] + 1,
				previous[j - 1] + (left[i - 1] === right[j - 1] ? 0 : 1),
			);
		}

		previous = current;
	}

	return previous[right.length];
}
