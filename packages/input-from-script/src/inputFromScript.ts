import { type AnyShape, createInput, type InputWithArgs, type SystemRunnerResult } from 'bingo';
import { z } from 'zod';

export interface InputFromScriptArgsShape extends AnyShape {
  command: z.ZodString;
}

export interface InputFromScriptArgs {
  command: string;
}

export const inputFromScript: InputWithArgs<
  Promise<SystemRunnerResult>,
  InputFromScriptArgsShape
> = createInput({
  args: {
    command: z.string(),
  },
  async produce({ args, runner }) {
    return await runner(args.command);
  },
});
