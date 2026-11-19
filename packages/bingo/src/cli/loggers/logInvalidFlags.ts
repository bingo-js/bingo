import * as prompts from '@clack/prompts';
import type { ArgsIssue } from 'parse-standard-args';

export function logInvalidFlags(issues: ArgsIssue[]) {
  prompts.log.error(issues.map((issue) => issue.message).join('\n'));
}
