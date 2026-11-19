import { describe, expect, it } from 'vitest';

import { executeTemplate } from './executeTemplate.ts';

describe('executeTemplate', () => {
  it('passes options to the template', () => {
    const source = '{{abc}}';
    const options = { abc: 123 };

    const actual = executeTemplate(source, options);

    expect(actual).toBe('123');
  });
});
