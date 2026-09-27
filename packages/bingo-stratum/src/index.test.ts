import type { AnyShape } from "bingo";
import { describe, expectTypeOf, it } from "vitest";

import type { StratumTemplate } from "./index.js";
import type { StratumTemplate as StratumTemplateFromTypes } from "./types/templates.js";

describe("index", () => {
	it("exports StratumTemplate", () => {
		expectTypeOf<StratumTemplate<AnyShape>>().toEqualTypeOf<
			StratumTemplateFromTypes<AnyShape>
		>();
	});
});
