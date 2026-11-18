import type { cliStatuses } from './status.ts';

export type ModeResults = ModeResultsError | ModeResultsNonError;

export interface ModeResultsBase {
  outro?: string;
  suggestions?: string[];
}

export interface ModeResultsError extends ModeResultsBase {
  error?: Error;
  status: typeof cliStatuses.error;
}

export interface ModeResultsNonError extends ModeResultsBase {
  status: typeof cliStatuses.cancelled | typeof cliStatuses.success;
}

export type ProductionSettings = ProductionSettingsSetup | ProductionSettingsTransition;

export interface ProductionSettingsSetup {
  mode: 'setup';
}

export interface ProductionSettingsTransition {
  configFile?: string;
  mode: 'transition';
}
