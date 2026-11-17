import { TemplateConfig } from '../types/configs.ts';
import { AnyShape } from '../types/shapes.ts';
import { isTemplate } from './isTemplate.ts';

export function isTemplateConfig(value: unknown): value is TemplateConfig<AnyShape, unknown> {
  return !!value && typeof value === 'object' && 'template' in value && isTemplate(value.template);
}
