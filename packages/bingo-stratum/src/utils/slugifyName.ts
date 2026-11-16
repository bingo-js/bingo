import slugify from 'slugify';

export function slugifyName(original: string) {
  return slugify(original.replaceAll('.', '-'), { lower: true });
}
