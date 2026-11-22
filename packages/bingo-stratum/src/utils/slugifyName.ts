import slugify from 'slugify';

export const slugifyName = (original: string): string => {
  return slugify(original.replaceAll('.', '-'), { lower: true });
};
