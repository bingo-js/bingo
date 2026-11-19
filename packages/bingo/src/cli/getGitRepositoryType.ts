import type { SystemRunner } from 'bingo-systems';

export type GitRepositoryType = 'none' | 'root' | 'subdirectory';

export async function getGitRepositoryType(runner: SystemRunner): Promise<GitRepositoryType> {
  const result = await runner('git rev-parse --git-dir');
  const message = result.stdout?.toString();

  if (!message || message.includes('fatal: not a git repository')) {
    return 'none';
  }

  if (message === '.git') {
    return 'root';
  }

  return 'subdirectory';
}
