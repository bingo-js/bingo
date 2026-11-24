import { describe, expect, it, vi } from 'vitest';

import { createTemplate } from '../../creators/createTemplate.ts';
import { templateMismatchError } from './templateMismatchError.ts';

const templateAnonymousA = createTemplate({
  produce: vi.fn(),
});

const templateAnonymousB = createTemplate({
  produce: vi.fn(),
});

const templateNamedA = createTemplate({
  about: { name: 'A' },
  produce: vi.fn(),
});

const templateNamedB = createTemplate({
  about: { name: 'B' },
  produce: vi.fn(),
});

describe(templateMismatchError, () => {
  it('returns a fully named error when both templates have names', () => {
    const actual = templateMismatchError(templateNamedA, templateNamedB);

    expect(actual).toEqual(
      new Error(`Config file template A is not the same as running template B.`),
    );
  });

  it('returns a fully anonymous error when both templates are anonymous', () => {
    const actual = templateMismatchError(templateAnonymousA, templateAnonymousB);

    expect(actual).toEqual(
      new Error(
        `Config file and running template are mismatched and do not have identifying names.`,
      ),
    );
  });

  it('returns a different installs error when both templates have the same name', () => {
    const templateNamedAFirst = createTemplate({
      about: { name: 'A' },
      produce: vi.fn(),
    });
    const templateNamedASecond = createTemplate({
      about: { name: 'A' },
      produce: vi.fn(),
    });

    const actual = templateMismatchError(templateNamedAFirst, templateNamedASecond);

    expect(actual).toEqual(
      new Error(
        `Config file and running template have the same name, A, but are not the same object. This generally means the config file and CLI loaded the template from different installs. Run the locally installed version of the CLI instead, such as by removing @latest from the npx command.`,
      ),
    );
  });

  it('returns a mixed error when the config template is anonymous and the running template is named', () => {
    const actual = templateMismatchError(templateAnonymousA, templateNamedB);

    expect(actual).toEqual(
      new Error(`Config file template (anonymous) is not the same as running template B.`),
    );
  });

  it('returns a mixed error when the config template is named and the running template is anonymous', () => {
    const actual = templateMismatchError(templateNamedA, templateAnonymousB);

    expect(actual).toEqual(
      new Error(`Config file template A is not the same as running template (anonymous).`),
    );
  });
});
