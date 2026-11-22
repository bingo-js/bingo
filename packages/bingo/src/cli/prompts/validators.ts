import * as fs from 'node:fs';

import type { z } from 'zod';

export const validateNewDirectory = (value?: string): string | undefined => {
  if (value && fs.existsSync(value)) {
    return `That directory already exists. Please choose another one.`;
  }

  return validateText(value);
};

export const validateNumber = (value?: string): string | undefined => {
  if (value !== undefined && isNaN(parseFloat(value))) {
    return 'Please enter a numeric value.';
  }
};

export const validatorFromSchema = (schema: z.ZodType) => {
  return (value?: string): string | undefined => {
    return schema.safeParse(value).error?.issues[0].message ?? validateText(value);
  };
};

const validateText = (value?: string): string | undefined => {
  if (!value) {
    return 'Please enter a value.';
  }
};
