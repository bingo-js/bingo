import { describe, expect, it } from "vitest";

import { getColorsEnv } from "./getColorsEnv.js";

function createStdout(isTTY: boolean, maxColors = 0) {
	return {
		hasColors: (count: number) => count <= maxColors,
		isTTY,
	};
}

describe(getColorsEnv, () => {
	it("returns undefined when stdout is not a TTY", () => {
		const actual = getColorsEnv(createStdout(false, 2 ** 24));

		expect(actual).toBeUndefined();
	});

	it("returns undefined when the TTY does not support colors", () => {
		const actual = getColorsEnv(createStdout(true));

		expect(actual).toBeUndefined();
	});

	it("returns level 1 when the TTY supports only basic colors", () => {
		const actual = getColorsEnv(createStdout(true, 16));

		expect(actual).toEqual({ FORCE_COLOR: "1" });
	});

	it("returns level 2 when the TTY supports 256 colors", () => {
		const actual = getColorsEnv(createStdout(true, 2 ** 8));

		expect(actual).toEqual({ FORCE_COLOR: "2" });
	});

	it("returns level 3 when the TTY supports 16 million colors", () => {
		const actual = getColorsEnv(createStdout(true, 2 ** 24));

		expect(actual).toEqual({ FORCE_COLOR: "3" });
	});
});
