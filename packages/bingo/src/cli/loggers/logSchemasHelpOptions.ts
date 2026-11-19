import { describeOptions, formatFlagType } from 'parse-standard-args';

import type { AnyShape } from '../../types/shapes.ts';
import { logHelpOptions } from './logHelpOptions.ts';

export function logSchemasHelpOptions(packageName: string, schemas: AnyShape) {
  logHelpOptions(
    packageName,
    packageName,
    describeOptions(schemas)
      .filter((flag) => !flag.hidden)
      .map((flag) => ({
        flag: `--${flag.key}`,
        text: asSentence(flag.description),
        type: formatFlagType(flag),
      })),
  );
}

function asSentence(text: string | undefined) {
  return text && text[0].toUpperCase() + text.slice(1) + '.';
}
