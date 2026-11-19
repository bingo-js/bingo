import * as prompts from '@clack/prompts';
import type { ArgsIssue } from 'parse-standard-args';
import { formatIssues } from 'parse-standard-args';

export function logInvalidFlags(issues: ArgsIssue[]) {
  prompts.log.error(formatIssues(issues));
}
