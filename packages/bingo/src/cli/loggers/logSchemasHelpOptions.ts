import type { FlagDescriptor } from 'parse-standard-args';
import { describeOptions, formatFlagDescription, formatFlagType } from 'parse-standard-args';

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
        text: asSentence(flag),
        type: formatFlagType(flag),
      })),
  );
}

function asSentence(flag: FlagDescriptor) {
  const text = formatFlagDescription(flag);
  return text && text[0].toUpperCase() + text.slice(1) + (flag.description ? '.' : '');
}
