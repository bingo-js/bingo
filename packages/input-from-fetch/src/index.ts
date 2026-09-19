import { createInput } from "bingo";
import { z } from "zod";

import { fetchInit } from "./fetchInit.js";

export const inputFromFetch = createInput({
	args: {
		init: fetchInit.optional(),
		resource: z.string(),
	},
	async produce({ args, fetchers, offline }) {
		if (offline) {
			return undefined;
		}

		try {
			return await fetchers.fetch(args.resource, args.init);
		} catch (error) {
			return error as Error;
		}
	},
});
