import type { AnyShape } from "bingo";
import { describe, expect, it } from "vitest";

import type { StratumTemplate } from "./index.js";

describe("index", () => {
	it("exports StratumTemplate", () => {
		const receivesTemplate = <OptionsShape extends AnyShape>(
			template: StratumTemplate<OptionsShape>,
		) => template;

		expect(receivesTemplate).toBeTypeOf("function");
	});
});
