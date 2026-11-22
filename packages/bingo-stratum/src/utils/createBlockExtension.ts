export interface BlockExtension<Block, Props extends object> {
  block: Block;
  props: Props;
}

export const createBlockExtension = <Block, Props extends object>(
  block: Block,
  props: Props,
  name: string | undefined,
): BlockExtension<Block, Props> => {
  const created = { block, props };

  if (name) {
    Object.defineProperty(created, 'toJSON', {
      value: () => ({ block: `[Block ${name}]`, props }),
    });
  }

  return created;
};
