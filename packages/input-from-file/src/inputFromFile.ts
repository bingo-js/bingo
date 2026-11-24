import { type AnyShape, createInput, type InputWithArgs } from 'bingo';
import { z } from 'zod';

export interface InputFromFileArgsShape extends AnyShape {
  filePath: z.ZodString;
}

export interface InputFromFileArgs {
  filePath: string;
}

export const inputFromFile: InputWithArgs<
  Promise<string | Error>,
  InputFromFileArgsShape
> = createInput({
  args: {
    filePath: z.string(),
  },
  async produce({ args, fs }) {
    try {
      return await fs.readFile(args.filePath);
    } catch (error) {
      return error instanceof Error ? error : new Error(error as string);
    }
  },
});
