import { SystemFetchers } from '../fetchers/types.ts';
import { WritingFileSystem } from '../files/types.ts';
import { SystemRunner } from '../runner/runner.ts';

/**
 * Shared APIs used by Bingo preparers, producers, and runners.
 */
export interface BingoSystem {
  /**
   * APIs to send network requests.
   */
  fetchers: SystemFetchers;

  /**
   * APIs to read from and write to a file system.
   */
  fs: WritingFileSystem;

  /**
   * Executes a command in the system shell.
   */
  runner: SystemRunner;
}
