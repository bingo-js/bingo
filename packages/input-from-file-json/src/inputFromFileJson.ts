import { createInput, type InputWithArgs } from 'bingo';
import {
  inputFromFile,
  type InputFromFileArgs,
  type InputFromFileArgsShape,
} from 'input-from-file';

export type InputFromFileJsonArgs = InputFromFileArgs;
export type InputFromFileJsonArgsShape = InputFromFileArgsShape;

export const inputFromFileJson: InputWithArgs<
  Promise<unknown>,
  InputFromFileJsonArgsShape
> = createInput({
  args: inputFromFile.args,
  async produce({ args, take }) {
    const text = await take(inputFromFile, args);

    if (text instanceof Error) {
      return text;
    }

    try {
      return JSON.parse(text) as unknown;
    } catch (error) {
      return error;
    }
  },
});
