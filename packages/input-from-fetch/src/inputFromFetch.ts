import { type AnyShape, createInput, type InputWithArgs } from 'bingo';
import { z } from 'zod';

import { fetchInit } from './fetchInit.ts';

export interface InputFromFetchArgsShape extends AnyShape {
  init: z.ZodOptional<z.ZodType<RequestInit>>;
  resource: z.ZodString;
}

export interface InputFromFetchArgs {
  init?: RequestInit | undefined;
  resource: string;
}

export const inputFromFetch: InputWithArgs<
  Promise<Response | Error | undefined>,
  InputFromFetchArgsShape
> = createInput({
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
