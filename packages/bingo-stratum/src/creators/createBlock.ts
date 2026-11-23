import type { AnyOptionalShape, InferredObject } from 'bingo';

import type {
  BlockContextWithProps,
  BlockDefinitionWithoutProps,
  BlockDefinitionWithProps,
  BlockWithoutProps,
  BlockWithProps,
} from '../types/blocks.ts';
import { createBlockExtension } from '../utils/createBlockExtension.ts';
import { applyZodDefaults, isDefinitionWithProps } from './utils.ts';

export function createBlock<PropsShape extends AnyOptionalShape, Options extends object>(
  blockDefinition: BlockDefinitionWithProps<PropsShape, Options>,
): BlockWithProps<InferredObject<PropsShape>, Options>;
export function createBlock<Options extends object>(
  blockDefinition: BlockDefinitionWithoutProps<Options>,
): BlockWithoutProps<Options>;
export function createBlock<PropsShape extends AnyOptionalShape, Options extends object>(
  blockDefinition:
    | BlockDefinitionWithoutProps<Options>
    | BlockDefinitionWithProps<PropsShape, Options>,
): unknown {
  const produce = blockDefinition.produce ?? produceNothing;

  // Blocks without Props can't be called as functions.
  if (!isDefinitionWithProps(blockDefinition)) {
    const block = () => {
      return block;
    };
    Object.assign(block, { ...blockDefinition, produce });
    return block;
  }

  const propsSchema = blockDefinition.props;

  type Props = InferredObject<PropsShape>;

  // Blocks with Props do need to be callable as functions...
  function block(props: Props) {
    return createBlockExtension(block, props, blockDefinition.about?.name);
  }

  // ...and also still have the Block Definition properties.
  Object.assign(block, blockDefinition);

  block.produce = (context: BlockContextWithProps<Props, Options>) => {
    return produce({
      ...context,
      props: applyZodDefaults(propsSchema, context.props, blockDefinition.about?.name),
    });
  };

  return block;
}

function produceNothing() {
  return {};
}
