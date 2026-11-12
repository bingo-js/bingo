import * as fs from 'node:fs';

import { z } from 'zod';

export const validateNewDirectory = (value?: string) => {
  if (value && fs.existsSync(value)) {
    return `That directory already exists. Please choose another one.`;
  }

  return validateText(value);
};

export function validateNumber(value?: string) {
  if (value !== undefined && isNaN(parseFloat(value))) {
    return 'Please enter a numeric value.';
  }
}

export function validatorFromSchema(schema: z.ZodType) {
  return (value?: string) => {
    return schema.safeParse(value).error?.issues[0].message ?? validateText(value);
  };
}

const validateText = (value?: string) => {
  if (!value) {
    return 'Please enter a value.';
  }
};
