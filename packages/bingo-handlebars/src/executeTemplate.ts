import Handlebars from 'handlebars';

export const executeTemplate = (source: string, options?: object): string => {
  return Handlebars.compile(source)(options);
};
