import type { BingoSystem } from 'bingo-systems';

import type { Display } from '../contexts/createDisplay.ts';
import type { TakeInput } from './inputs.ts';

/**
 * Internal context in Bingo areas that rely on a CLI-style directory or display.
 */
export interface SystemContext extends BingoSystem {
  directory: string;
  display: Display;
  take: TakeInput;
}
