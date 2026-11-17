export const cliStatuses = {
  success: 0,
  error: 1,
  cancelled: 2,
} as const;
export type CliStatus = (typeof cliStatuses)[CliStatusType];
export type CliStatusType = 'cancelled' | 'error' | 'success';
