import { describe, expect, it, vi } from 'vitest';

import { getGitRepositoryType } from './getGitRepositoryType.ts';

describe(getGitRepositoryType, () => {
  it('returns "none" when git rev-parse --git-dir has no output', async () => {
    const runner = vi.fn().mockResolvedValueOnce({
      stdout: undefined,
    });

    const actual = await getGitRepositoryType(runner);

    expect(actual).toBe('none');
  });

  it('returns "none" when git rev-parse --git-dir has a fatal stdout', async () => {
    const runner = vi.fn().mockResolvedValueOnce({
      stdout: 'fatal: not a git repository ...',
    });

    const actual = await getGitRepositoryType(runner);

    expect(actual).toBe('none');
  });

  it('returns "root" when git rev-parse --git-dir returns just .git', async () => {
    const runner = vi.fn().mockResolvedValueOnce({
      stdout: '.git',
    });

    const actual = await getGitRepositoryType(runner);

    expect(actual).toBe('root');
  });

  it('returns "subdirectory" when git rev-parse --git-dir returns a subdirectory', async () => {
    const runner = vi.fn().mockResolvedValueOnce({
      stdout: '/parent/directory/.git',
    });

    const actual = await getGitRepositoryType(runner);

    expect(actual).toBe('subdirectory');
  });
});
